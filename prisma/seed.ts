/**
 * Project LOOP Database Seed Script
 * 
 * Demo Login Credentials (all users use the same password):
 * Password: Demo1234!
 * 
 * - ADMIN:   admin@acmecorp.com
 * - ANALYST: analyst@acmecorp.com
 * - VIEWER:  viewer@acmecorp.com
 */

import { PrismaClient, UserRole, Sentiment, FeedbackStatus } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env and .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL or DIRECT_URL environment variable is missing!')
}

const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting ultra-fast batch database seed against Neon PostgreSQL...')

  // 1. Truncate all tables cleanly in PostgreSQL
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Embedding", "FeedbackTheme", "Report", "Feedback", "Theme", "User", "Workspace" RESTART IDENTITY CASCADE;`)
  console.log('✅ Cleared existing data and reset identity sequences.')

  // 2. Create 1 demo Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Acme Corp',
    },
  })
  console.log(`✅ Created Workspace: ${workspace.name} (ID: ${workspace.id})`)

  // 3. Create 3 Users (ADMIN, ANALYST, VIEWER)
  const passwordHash = await bcrypt.hash('Demo1234!', 10)

  await prisma.user.createMany({
    data: [
      { name: 'Sarah Jenkins', email: 'admin@acmecorp.com', passwordHash, role: UserRole.ADMIN, workspaceId: workspace.id },
      { name: 'Alex Rivera', email: 'analyst@acmecorp.com', passwordHash, role: UserRole.ANALYST, workspaceId: workspace.id },
      { name: 'Jordan Lee', email: 'viewer@acmecorp.com', passwordHash, role: UserRole.VIEWER, workspaceId: workspace.id },
    ],
  })

  console.log(`✅ Created 3 Users: ADMIN (admin@acmecorp.com), ANALYST (analyst@acmecorp.com), VIEWER (viewer@acmecorp.com)`)

  // 4. Create 6 Themes
  const themesData = [
    { name: 'Onboarding', description: 'User registration, initial setup, walkthroughs, and first-time user experience.', color: '#3B82F6', workspaceId: workspace.id },
    { name: 'Pricing', description: 'Subscription tiers, billing issues, feature gating, and value perception.', color: '#10B981', workspaceId: workspace.id },
    { name: 'Performance', description: 'Application page load times, API latency, crash reports, and system stability.', color: '#EF4444', workspaceId: workspace.id },
    { name: 'Mobile experience', description: 'Mobile web responsiveness, touch interactions, layout issues on smaller screens.', color: '#F59E0B', workspaceId: workspace.id },
    { name: 'Integrations', description: 'Third-party connectors, webhooks, API access, and export functionality.', color: '#8B5CF6', workspaceId: workspace.id },
    { name: 'UI & Design', description: 'Visual aesthetics, dark mode consistency, typography, and navigation ergonomics.', color: '#EC4899', workspaceId: workspace.id },
  ]

  await prisma.theme.createMany({ data: themesData })
  const createdThemes = await prisma.theme.findMany({ where: { workspaceId: workspace.id } })
  console.log(`✅ Created ${createdThemes.length} Themes`)

  const themeMap: Record<string, number> = {}
  createdThemes.forEach((t) => {
    themeMap[t.name] = t.id
  })

  // 5. Generate 130 realistic Feedback items via batch createMany
  const channels = ['support ticket', 'app store review', 'NPS survey', 'sales call note', 'community post']
  const customerLabels = ['Enterprise', 'Pro Plan', 'Free Tier', 'Trial User', 'VIP Client', 'Startup Plan', 'Partner']

  const feedbackTemplates = [
    { content: "The new step-by-step setup wizard reduced our onboarding time from days to minutes. Super impressive!", theme: "Onboarding", sentiment: Sentiment.POS, score: 0.92, status: FeedbackStatus.ACTIONED, channel: "NPS survey" },
    { content: "Initial account creation was smooth, but I got slightly confused when inviting team members.", theme: "Onboarding", sentiment: Sentiment.NEU, score: 0.10, status: FeedbackStatus.REVIEWED, channel: "support ticket" },
    { content: "Onboarding failed completely when trying to connect our SSO via Okta. We had to file a support ticket.", theme: "Onboarding", sentiment: Sentiment.NEG, score: -0.85, status: FeedbackStatus.NEW, channel: "support ticket" },
    { content: "Loved the interactive tour during first login! Made understanding dashboard metrics effortless.", theme: "Onboarding", sentiment: Sentiment.POS, score: 0.88, status: FeedbackStatus.REVIEWED, channel: "community post" },
    { content: "The welcome email took 20 minutes to arrive, delaying our team's initial testing session.", theme: "Onboarding", sentiment: Sentiment.NEG, score: -0.62, status: FeedbackStatus.NEW, channel: "support ticket" },

    { content: "The Pro tier pricing is extremely fair considering the unlimited analytics history provided.", theme: "Pricing", sentiment: Sentiment.POS, score: 0.79, status: FeedbackStatus.REVIEWED, channel: "sales call note" },
    { content: "We need an annual billing discount option for non-profits and educational institutions.", theme: "Pricing", sentiment: Sentiment.NEU, score: 0.05, status: FeedbackStatus.NEW, channel: "sales call note" },
    { content: "Price jump from Startup tier to Enterprise is way too steep for mid-market companies.", theme: "Pricing", sentiment: Sentiment.NEG, score: -0.78, status: FeedbackStatus.REVIEWED, channel: "community post" },
    { content: "Add-on seat charges were unexpected on our monthly invoice. Please clarify per-user pricing breakdown.", theme: "Pricing", sentiment: Sentiment.NEG, score: -0.65, status: FeedbackStatus.ACTIONED, channel: "support ticket" },
    { content: "Transparent pricing structure makes it very easy to get budget approval from finance.", theme: "Pricing", sentiment: Sentiment.POS, score: 0.84, status: FeedbackStatus.REVIEWED, channel: "NPS survey" },

    { content: "Page render speeds have improved dramatically after the recent backend update. Great job!", theme: "Performance", sentiment: Sentiment.POS, score: 0.91, status: FeedbackStatus.ACTIONED, channel: "app store review" },
    { content: "Dashboard takes 5-8 seconds to load when querying data ranges greater than 90 days.", theme: "Performance", sentiment: Sentiment.NEG, score: -0.72, status: FeedbackStatus.NEW, channel: "support ticket" },
    { content: "Exporting large CSV files occasionally times out during peak business hours.", theme: "Performance", sentiment: Sentiment.NEG, score: -0.81, status: FeedbackStatus.REVIEWED, channel: "support ticket" },
    { content: "API response times consistently average under 40ms globally. Very reliable infrastructure.", theme: "Performance", sentiment: Sentiment.POS, score: 0.95, status: FeedbackStatus.REVIEWED, channel: "community post" },
    { content: "Search queries feel slightly sluggish on dataset sizes exceeding 50,000 feedback records.", theme: "Performance", sentiment: Sentiment.NEU, score: -0.25, status: FeedbackStatus.NEW, channel: "support ticket" },

    { content: "The mobile app layout is crisp, responsive, and easy to navigate while on the go.", theme: "Mobile experience", sentiment: Sentiment.POS, score: 0.86, status: FeedbackStatus.REVIEWED, channel: "app store review" },
    { content: "Tables overlap with the sidebar when viewing reports on iPad portrait orientation.", theme: "Mobile experience", sentiment: Sentiment.NEG, score: -0.68, status: FeedbackStatus.NEW, channel: "support ticket" },
    { content: "Buttons near the bottom navigation bar are hard to tap on smaller iPhone screens.", theme: "Mobile experience", sentiment: Sentiment.NEG, score: -0.55, status: FeedbackStatus.ACTIONED, channel: "app store review" },
    { content: "Mobile experience is decent, though some complex filter menus require extra scrolling.", theme: "Mobile experience", sentiment: Sentiment.NEU, score: 0.02, status: FeedbackStatus.REVIEWED, channel: "NPS survey" },
    { content: "Push notifications on iOS arrive instantly when urgent feedback tags are triggered.", theme: "Mobile experience", sentiment: Sentiment.POS, score: 0.89, status: FeedbackStatus.REVIEWED, channel: "app store review" },

    { content: "Slack integration sends real-time sentiment alerts straight to our product channel. Incredible feature!", theme: "Integrations", sentiment: Sentiment.POS, score: 0.94, status: FeedbackStatus.ACTIONED, channel: "community post" },
    { content: "We urgently need a native HubSpot CRM integration to sync feedback with customer contact profiles.", theme: "Integrations", sentiment: Sentiment.NEU, score: 0.12, status: FeedbackStatus.NEW, channel: "sales call note" },
    { content: "Zapier webhook integration occasionally drops payload events during batch synchronizations.", theme: "Integrations", sentiment: Sentiment.NEG, score: -0.74, status: FeedbackStatus.REVIEWED, channel: "support ticket" },
    { content: "Jira integration allows one-click bug creation directly from flagged feedback items.", theme: "Integrations", sentiment: Sentiment.POS, score: 0.90, status: FeedbackStatus.ACTIONED, channel: "sales call note" },
    { content: "API rate limits are too restrictive for automated daily ETL data syncs.", theme: "Integrations", sentiment: Sentiment.NEG, score: -0.60, status: FeedbackStatus.NEW, channel: "support ticket" },

    { content: "The dark mode theme is gorgeous! Clean typography and easy on the eyes during late night work.", theme: "UI & Design", sentiment: Sentiment.POS, score: 0.96, status: FeedbackStatus.REVIEWED, channel: "community post" },
    { content: "Contrast ratios on chart legends are a bit low in high ambient light environments.", theme: "UI & Design", sentiment: Sentiment.NEU, score: -0.10, status: FeedbackStatus.NEW, channel: "NPS survey" },
    { content: "Navigation bar icons look outdated compared to the rest of the modern interface.", theme: "UI & Design", sentiment: Sentiment.NEG, score: -0.45, status: FeedbackStatus.ACTIONED, channel: "app store review" },
    { content: "Color coding on sentiment indicators (green/yellow/red) makes triaging issues effortless.", theme: "UI & Design", sentiment: Sentiment.POS, score: 0.87, status: FeedbackStatus.REVIEWED, channel: "community post" },
    { content: "Font size controls in settings would really help team members with vision accessibility needs.", theme: "UI & Design", sentiment: Sentiment.NEU, score: 0.15, status: FeedbackStatus.REVIEWED, channel: "support ticket" }
  ]

  const rawFeedbackBatch = []
  const themeAssociations: Array<{ index: number; primaryTheme: string }> = []

  for (let i = 0; i < 130; i++) {
    const template = feedbackTemplates[i % feedbackTemplates.length]
    const channel = channels[i % channels.length]
    const customerLabel = customerLabels[i % customerLabels.length]
    
    let score = template.score + ((i % 5) - 2) * 0.02
    score = Math.max(-0.99, Math.min(0.99, Number(score.toFixed(3))))

    const statuses = [FeedbackStatus.NEW, FeedbackStatus.REVIEWED, FeedbackStatus.ACTIONED]
    const status = statuses[i % statuses.length]

    const variantNumber = Math.floor(i / feedbackTemplates.length) + 1
    const content = variantNumber > 1 ? `${template.content} [Batch #${variantNumber}]` : template.content

    rawFeedbackBatch.push({
      content,
      channel,
      sourceRef: `REF-${1000 + i}`,
      customerLabel,
      sentiment: template.sentiment,
      sentimentScore: score,
      status,
      workspaceId: workspace.id,
    })

    themeAssociations.push({ index: i, primaryTheme: template.theme })
  }

  await prisma.feedback.createMany({ data: rawFeedbackBatch })
  const allCreatedFeedback = await prisma.feedback.findMany({
    where: { workspaceId: workspace.id },
    select: { id: true, sourceRef: true },
    orderBy: { id: 'asc' },
  })

  console.log(`✅ Created ${allCreatedFeedback.length} Feedback items (all scoped to Workspace ID: ${workspace.id})`)

  const feedbackThemeLinks: Array<{ feedbackId: number; themeId: number; confidence: number }> = []

  allCreatedFeedback.forEach((f, idx) => {
    const assoc = themeAssociations[idx]
    if (assoc) {
      const themeId = themeMap[assoc.primaryTheme]
      if (themeId) {
        const confidence = Number((0.80 + (idx % 18) * 0.01).toFixed(3))
        feedbackThemeLinks.push({
          feedbackId: f.id,
          themeId: themeId,
          confidence,
        })
      }

      if ((idx + 1) % 3 === 0) {
        const secondaryThemeNames = Object.keys(themeMap).filter((name) => name !== assoc.primaryTheme)
        const secThemeName = secondaryThemeNames[idx % secondaryThemeNames.length]
        const secThemeId = themeMap[secThemeName]
        if (secThemeId) {
          const secConfidence = Number((0.55 + (idx % 20) * 0.015).toFixed(3))
          feedbackThemeLinks.push({
            feedbackId: f.id,
            themeId: secThemeId,
            confidence: secConfidence,
          })
        }
      }
    }
  })

  await prisma.feedbackTheme.createMany({
    data: feedbackThemeLinks,
    skipDuplicates: true,
  })

  console.log(`✅ Created ${feedbackThemeLinks.length} FeedbackTheme join relations`)
  console.log('\n🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
