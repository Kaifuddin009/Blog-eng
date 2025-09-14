import connectedToData from "../database/mongodb.js";
import { Admin } from "../models/admin.model.js";

async function seedAdmin() {
  await connectedToData();

  const existingAdmin = await Admin.findOne({email:"uddinkaif00@gmail.com"});
  if (existingAdmin) {
    console.log("⚠️ Admin already exists:", existingAdmin.email);
    process.exit(0);
  }
const admin = new Admin({
    name: "Sheikh",
    email: "uddinkaif00@gmail.com",
    password: "12345678", // gets hashed automatically
    role: "superadmin"
  });

  await admin.save();
  console.log("✅ Admin seeded successfully");
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error("❌ Error seeding admin:", err);
  process.exit(1);
});