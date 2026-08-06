import { feedbacks } from "@/data/feedback";
import { Feedback } from "@/types/feedback";
import { classifyFeedbackWithGemini } from "@/lib/ai";

class FeedbackService {
  async getFeedback(): Promise<Feedback[]> {
    // Future:
    // const response = await fetch("/api/feedback");
    // return response.json();

    return Promise.resolve([...feedbacks]);
  }

  async getFeedbackById(
    id: string
  ): Promise<Feedback | undefined> {
    // Future:
    // const response = await fetch(`/api/feedback/${id}`);
    // return response.json();

    return Promise.resolve(
      feedbacks.find((item) => item.id === id)
    );
  }

  async createFeedback(
    feedback: Omit<Feedback, "id">,
    autoClassify: boolean = true
  ): Promise<Feedback> {
    let classificationData: Partial<Feedback> = {};

    if (autoClassify && feedback.message) {
      try {
        const existingThemes = Array.from(
          new Set(feedbacks.map((f) => f.category).filter(Boolean))
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
      id: crypto.randomUUID(),
    };

    feedbacks.unshift(newFeedback);

    return Promise.resolve(newFeedback);
  }

  async updateFeedback(
    id: string,
    data: Partial<Feedback>
  ): Promise<Feedback | undefined> {
    // Future:
    // PUT /api/feedback/:id

    const feedback = feedbacks.find(
      (item) => item.id === id
    );

    if (!feedback) {
      return Promise.resolve(undefined);
    }

    Object.assign(feedback, data);

    return Promise.resolve(feedback);
  }

  async deleteFeedback(
    id: string
  ): Promise<boolean> {
    // Future:
    // DELETE /api/feedback/:id

    const index = feedbacks.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      return Promise.resolve(false);
    }

    feedbacks.splice(index, 1);

    return Promise.resolve(true);
  }
}

export const feedbackService = new FeedbackService();