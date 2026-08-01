"use client";

import { useEffect, useMemo, useState } from "react";

import FeedbackHeader from "@/components/feedback/FeedbackHeader";
import FeedbackFilters from "@/components/feedback/FeedbackFilters";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import FeedbackPagination from "@/components/feedback/FeedbackPagination";
import FeedbackDrawer from "@/components/feedback/FeedbackDrawer";
import EmptyFeedback from "@/components/feedback/EmptyFeedback";
import AddFeedbackModal from "@/components/feedback/AddFeedbackModal";
import CSVImportModal from "@/components/feedback/CSVImportModal";

import { feedbackService } from "@/services/feedback.service";
import { Feedback, FeedbackStatus } from "@/types/feedback";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sentiment, setSentiment] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function loadFeedback() {
      const data = await feedbackService.getFeedback();
      setFeedback([...data]);
    }
    loadFeedback();
  }, []);

  // Filtered feedback
  const filteredFeedback = useMemo(() => {
    return feedback.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !status || item.status === status;
      const matchesSentiment = !sentiment || item.sentiment === sentiment;

      return matchesSearch && matchesStatus && matchesSentiment;
    });
  }, [feedback, search, status, sentiment]);

  const totalPages = Math.max(1, Math.ceil(filteredFeedback.length / pageSize));

  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handlers
  async function handleAddSingleFeedback(newEntry: Omit<Feedback, "id">) {
    const created = await feedbackService.createFeedback(newEntry);
    setFeedback((prev) => [created, ...prev]);
  }

  async function handleImportCSV(items: Omit<Feedback, "id">[]) {
    const createdItems: Feedback[] = [];
    for (const item of items) {
      const created = await feedbackService.createFeedback(item);
      createdItems.push(created);
    }
    setFeedback((prev) => [...createdItems, ...prev]);
  }

  async function handleStatusChange(id: string, newStatus: FeedbackStatus) {
    await feedbackService.updateFeedback(id, { status: newStatus });
    setFeedback((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedFeedback && selectedFeedback.id === id) {
      setSelectedFeedback((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  }

  async function handleDeleteFeedback(id: string) {
    await feedbackService.deleteFeedback(id);
    setFeedback((prev) => prev.filter((item) => item.id !== id));
    if (selectedFeedback?.id === id) {
      setSelectedFeedback(null);
      setDrawerOpen(false);
    }
  }

  function handleViewFeedback(item: Feedback) {
    setSelectedFeedback(item);
    setDrawerOpen(true);
  }

  return (
    <>
      <div className="space-y-8">
        <FeedbackHeader
          onOpenAddModal={() => setAddModalOpen(true)}
          onOpenCSVModal={() => setCsvModalOpen(true)}
        />

        <FeedbackFilters
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          status={status}
          onStatusChange={(val) => {
            setStatus(val);
            setCurrentPage(1);
          }}
          sentiment={sentiment}
          onSentimentChange={(val) => {
            setSentiment(val);
            setCurrentPage(1);
          }}
        />

        {filteredFeedback.length === 0 ? (
          <EmptyFeedback />
        ) : (
          <>
            <FeedbackTable
              feedback={paginatedFeedback}
              onView={handleViewFeedback}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteFeedback}
            />

            <FeedbackPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredFeedback.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Modals & Drawer */}
      <AddFeedbackModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddSingleFeedback}
      />

      <CSVImportModal
        open={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
        onImport={handleImportCSV}
      />

      <FeedbackDrawer
        feedback={selectedFeedback}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedFeedback(null);
        }}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteFeedback}
      />
    </>
  );
}