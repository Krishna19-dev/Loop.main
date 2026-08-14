import { feedbacks as SEED_FEEDBACKS } from "@/data/feedback";
import { Feedback } from "@/types/feedback";
import { classifyFeedbackWithGemini } from "@/lib/ai";

class FeedbackService {
  private storageKey = "loop_feedbacks_v2";

  private getStoredFeedback(): Feedback[] {
    if (typeof window === "undefined") return SEED_FEEDBACKS;

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(SEED_FEEDBACKS));
      return SEED_FEEDBACKS;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return SEED_FEEDBACKS;
    }
  }

  private saveFeedback(list: Feedback[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      window.dispatchEvent(new Event("loop_feedback_updated"));
    }
  }

  async getFeedback(): Promise<Feedback[]> {
    return Promise.resolve(this.getStoredFeedback());
  }

  async getFeedbackById(id: string): Promise<Feedback | undefined> {
    const list = this.getStoredFeedback();
    return Promise.resolve(list.find((item) => item.id === id));
  }

  async createFeedback(
    feedback: Omit<Feedback, "id">,
    autoClassify: boolean = true
  ): Promise<Feedback> {
    const list = this.getStoredFeedback();
    let classificationData: Partial<Feedback> = {};

    if (autoClassify && feedback.message) {
      try {
        const existingThemes = Array.from(
          new Set(list.map((f) => f.category).filter(Boolean))
        );
        const classification = await classifyFeedbackWithGemini(
          feedback.message,
          existingThemes
        );

        classificationData = {
          sentiment: classification.sentiment,
          sentimentScore: classification.sentimentScore,
          themes: classification.themes,
          featureArea: classification.featureArea,
          category: classification.themes[0] || classification.featureArea || feedback.category || "General",
          classifiedAt: new Date().toISOString(),
        };
      } catch (err) {
        console.warn("[Auto-classification warning on createFeedback]", err);
      }
    }

    const newFeedback: Feedback = {
      ...feedback,
      ...classificationData,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    };

    const updated = [newFeedback, ...list];
    this.saveFeedback(updated);
    return Promise.resolve(newFeedback);
  }

  async updateFeedback(
    id: string,
    data: Partial<Feedback>
  ): Promise<Feedback | undefined> {
    const list = this.getStoredFeedback();
    const index = list.findIndex((item) => item.id === id);

    if (index === -1) {
      return Promise.resolve(undefined);
    }

    list[index] = {
      ...list[index],
      ...data,
    };

    this.saveFeedback(list);
    return Promise.resolve(list[index]);
  }

  async deleteFeedback(id: string): Promise<boolean> {
    const list = this.getStoredFeedback();
    const filtered = list.filter((item) => item.id !== id);

    if (filtered.length !== list.length) {
      this.saveFeedback(filtered);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export const feedbackService = new FeedbackService();