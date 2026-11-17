import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const rawPassword = process.env.ADMIN_PASSWORD;
  const fullName = process.env.ADMIN_NAME || "System Admin";

  if (!email || !rawPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be defined in your .env file."
    );
  }

  // Hash the admin password securely
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // Upsert ensures we don't duplicate the user if the seed script runs multiple times
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email,
      password: hashedPassword,
      fullName,
      role: Role.ADMIN,
    },
  });

  console.log(`✅ Admin user seeded successfully: ${admin.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });