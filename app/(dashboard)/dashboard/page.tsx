"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { feedbackService } from "@/services/feedback.service";
import { User } from "@/types/auth";
import { Feedback, FeedbackStatus } from "@/types/feedback";

import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import DashboardCards from "@/components/dashboard/DashboardCards";
import FeedbackChart from "@/components/dashboard/FeedbackChart";
import SentimentChart from "@/components/dashboard/SentimentChart";
import RecentFeedbackTable from "@/components/dashboard/RecentFeedbackTable";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import TopCategories from "@/components/dashboard/TopCategories";
import AIInsightsCard from "@/components/dashboard/AIInsightsCard";
import FeedbackDrawer from "@/components/feedback/FeedbackDrawer";

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await feedbackService.getFeedback();
      setFeedbacks(data);
    }
    loadData();
  }, []);

  function handleView(feedbackItem: Feedback) {
    setSelectedFeedback(feedbackItem);
    setDrawerOpen(true);
  }

  function handleEdit(feedbackItem: Feedback) {
    setSelectedFeedback(feedbackItem);
    setDrawerOpen(true);
  }

  async function handleDelete(target: string | Feedback) {
    const id = typeof target === "string" ? target : target.id;
    await feedbackService.deleteFeedback(id);
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    if (selectedFeedback?.id === id) {
      setDrawerOpen(false);
      setSelectedFeedback(null);
    }
  }

  async function handleStatusChange(id: string, status: FeedbackStatus) {
    await feedbackService.updateFeedback(id, { status });
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
    if (selectedFeedback?.id === id) {
      setSelectedFeedback((prev) => (prev ? { ...prev, status } : null));
    }
  }

  return (
    <div className="space-y-8">
      <WelcomeBanner name={currentUser?.name} feedbacks={feedbacks} />

      <DashboardCards feedbacks={feedbacks} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeedbackChart />
        </div>
        <SentimentChart feedbacks={feedbacks} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentFeedbackTable
            feedbacks={feedbacks}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewAll={() => router.push("/feedback")}
          />
        </div>
        <ActivityTimeline />
      </div>

      <TopCategories feedbacks={feedbacks} />

      <AIInsightsCard />

      {/* View & Edit Feedback Drawer */}
      <FeedbackDrawer
        feedback={selectedFeedback}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedFeedback(null);
        }}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}