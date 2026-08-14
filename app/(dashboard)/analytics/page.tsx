"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { feedbackService } from "@/services/feedback.service";
import { notificationService } from "@/services/notification.service";
import { User } from "@/types/auth";
import { Feedback } from "@/types/feedback";

import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsCards from "@/components/analytics/AnalyticsCards";
import FeedbackTrendChart from "@/components/analytics/FeedbackTrendChart";
import SentimentPieChart from "@/components/analytics/SentimentPieChart";
import CategoryBarChart from "@/components/analytics/CategoryBarChart";
import RatingDistribution from "@/components/analytics/RatingDistribution";
import AIInsightsCard from "@/components/analytics/AIInsightsCard";
import ThemeClustersCard from "@/components/analytics/ThemeClustersCard";
import BrandLoader from "@/components/ui/BrandLoader";

export default function AnalyticsPage() {
  const [currentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isClusteringAI, setIsClusteringAI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const list = await feedbackService.getFeedback();
        setFeedbacks(list);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleReclusterAI() {
    try {
      setIsClusteringAI(true);
      const res = await fetch("/api/ai/cluster", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.clusters) {
        // Refresh feedbacks to pick up clustered themes
        const updatedList = await feedbackService.getFeedback();
        setFeedbacks(updatedList);

        const workspaceId = currentUser?.workspaceId || "ws_demo";
        const roleUpper = currentUser?.role?.toUpperCase();

        if (roleUpper === "ADMIN") {
          // Trigger #3: Admin changes theme/classification settings -> Notify ANALYST (DO NOT notify ADMIN)
          notificationService.notifyRole(
            workspaceId,
            "ANALYST",
            "THEME_SETTINGS_CHANGED",
            "Classification settings updated",
            `${currentUser?.name || "Admin"} updated theme settings`
          );
        } else if (roleUpper === "ANALYST") {
          // Trigger #4: Analyst activity -> Notify ADMIN
          notificationService.notifyRole(
            workspaceId,
            "ADMIN",
            "ANALYST_ACTIVITY",
            "Analyst activity",
            `${currentUser?.name || "Analyst"} re-clustered AI themes`
          );
        }
      }
    } catch (err) {
      console.warn("[AI Recluster Error]", err);
    } finally {
      setIsClusteringAI(false);
    }
  }

  function handleExportPdf() {
    const total = feedbacks.length || 1;
    const avgRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);
    const positiveCount = feedbacks.filter((f) => f.sentiment === "Positive").length;
    const neutralCount = feedbacks.filter((f) => f.sentiment === "Neutral").length;
    const negativeCount = feedbacks.filter((f) => f.sentiment === "Negative").length;
    const positiveRate = Math.round((positiveCount / total) * 100);

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>LOOP AI Analytics & Sentiment PDF Report</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; padding: 40px; margin: 0; }
          .header { border-bottom: 2px solid #0F3028; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 28px; font-weight: 800; color: #0F3028; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 6px; }
          .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; text-align: center; }
          .card-val { font-size: 24px; font-weight: 800; color: #0F3028; margin-top: 5px; }
          .card-lbl { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 30px; font-size: 13px; }
          th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; }
          th { background: #f1f5f9; color: #334155; font-weight: 700; }
          .section-title { font-size: 18px; font-weight: 700; color: #0F3028; margin-top: 25px; margin-bottom: 10px; border-left: 4px solid #6B8F71; padding-left: 10px; }
          .badge { padding: 4px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700; display: inline-block; }
          .badge-pos { background: #dcfce7; color: #15803d; }
          .badge-neu { background: #fef3c7; color: #b45309; }
          .badge-neg { background: #fee2e2; color: #b91c1c; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">PROJECT LOOP - ANALYTICS & SENTIMENT REPORT</h1>
          <div class="subtitle">Generated on ${new Date().toLocaleString()} | Exported by ${currentUser?.name || "Administrator"}</div>
        </div>

        <div class="grid">
          <div class="card">
            <div class="card-lbl">Total Feedback</div>
            <div class="card-val">${feedbacks.length}</div>
          </div>
          <div class="card">
            <div class="card-lbl">Average Rating</div>
            <div class="card-val">${avgRating} / 5.0</div>
          </div>
          <div class="card">
            <div class="card-lbl">Positive Sentiment</div>
            <div class="card-val">${positiveRate}%</div>
          </div>
          <div class="card">
            <div class="card-lbl">Pending Review</div>
            <div class="card-val">${feedbacks.filter((f) => f.status === "Pending").length}</div>
          </div>
        </div>

        <div class="section-title">1. Sentiment Distribution Summary</div>
        <table>
          <thead>
            <tr><th>Sentiment Type</th><th>Count</th><th>Percentage</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="badge badge-pos">Positive</span></td><td>${positiveCount}</td><td>${Math.round((positiveCount / total) * 100)}%</td></tr>
            <tr><td><span class="badge badge-neu">Neutral</span></td><td>${neutralCount}</td><td>${Math.round((neutralCount / total) * 100)}%</td></tr>
            <tr><td><span class="badge badge-neg">Negative</span></td><td>${negativeCount}</td><td>${Math.round((negativeCount / total) * 100)}%</td></tr>
          </tbody>
        </table>

        <div class="section-title">2. Complete Live Customer Feedback Dataset</div>
        <table>
          <thead>
            <tr><th>Customer</th><th>Category</th><th>Rating</th><th>Sentiment</th><th>Status</th><th>Date</th><th>Message</th></tr>
          </thead>
          <tbody>
            ${feedbacks
              .map(
                (f) => `
              <tr>
                <td><strong>${f.customer}</strong><br/><small style="color:#64748b">${f.email}</small></td>
                <td>${f.category}</td>
                <td><strong>${f.rating} ★</strong></td>
                <td><span class="badge ${
                  f.sentiment === "Positive"
                    ? "badge-pos"
                    : f.sentiment === "Negative"
                    ? "badge-neg"
                    : "badge-neu"
                }">${f.sentiment}</span></td>
                <td>${f.status}</td>
                <td>${f.date}</td>
                <td>${f.message}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }

  if (isLoading) {
    return <BrandLoader fullScreen={false} />;
  }

  if (!currentUser) return null;

  const role = currentUser.role;
  const isViewer = role === "VIEWER";

  return (
    <div className="space-y-8">
      {/* Role Banner */}
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-loop-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {role} View
          </span>
          <h1 className="text-xl font-bold text-slate-800">Analytics & Sentiment Insights</h1>
        </div>
        {isViewer && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Read-Only Analytics
          </span>
        )}
      </div>

      <AnalyticsHeader onExportPdf={handleExportPdf} />

      <AnalyticsCards feedbacks={feedbacks} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeedbackTrendChart feedbacks={feedbacks} />
        </div>
        <SentimentPieChart feedbacks={feedbacks} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CategoryBarChart feedbacks={feedbacks} />
        <RatingDistribution feedbacks={feedbacks} />
      </div>

      <ThemeClustersCard
        feedbacks={feedbacks}
        onReclusterAI={handleReclusterAI}
        isClusteringAI={isClusteringAI}
      />

      <AIInsightsCard feedbacks={feedbacks} />
    </div>
  );
}