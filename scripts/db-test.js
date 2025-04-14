// Simple script to test database connection
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Try to query the database
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('Connection to PostgreSQL successful!');
    console.log('\nDatabase tables created:');
    tables.forEach(table => console.log(`- ${table.table_name}`));
    
    // Count users
    const userCount = await prisma.user.count();
    console.log(`\nCurrent user count: ${userCount}`);
    
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();