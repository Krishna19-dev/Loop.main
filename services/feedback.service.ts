import { feedbacks } from "@/data/feedback";
import { Feedback } from "@/types/feedback";

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
    feedback: Omit<Feedback, "id">
  ): Promise<Feedback> {
    // Future:
    // POST /api/feedback

    const newFeedback: Feedback = {
      ...feedback,
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