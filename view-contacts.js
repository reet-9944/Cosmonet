// Script to view all contact messages from MongoDB
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function viewContacts() {
  console.log('📬 Fetching all contact messages from MongoDB...\n');

  try {
    const response = await fetch('http://localhost:4000/api/contacts');
    const data = await response.json();

    if (data.success) {
      console.log(`✅ Found ${data.contacts.length} message(s) in database\n`);
      console.log('═'.repeat(80));
      
      data.contacts.forEach((contact, index) => {
        console.log(`\n📧 Message #${index + 1}`);
        console.log('─'.repeat(80));
        console.log(`👤 Name:       ${contact.name}`);
        console.log(`📧 Email:      ${contact.email}`);
        console.log(`📋 Subject:    ${contact.subject}`);
        console.log(`💬 Message:    ${contact.message}`);
        console.log(`📊 Status:     ${contact.status}`);
        console.log(`🕐 Created:    ${new Date(contact.createdAt).toLocaleString()}`);
        console.log(`🆔 ID:         ${contact._id}`);
      });
      
      console.log('\n' + '═'.repeat(80));
      console.log('\n✅ All messages retrieved successfully!');
    } else {
      console.log('❌ Failed to fetch contacts');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

viewContacts();
