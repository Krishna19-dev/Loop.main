import { defineConfig } from '@prisma/config'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || '',
  },
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
})
