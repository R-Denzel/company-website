# Email Configuration Setup Guide

Your website now sends form submissions to **maledenzel@gmail.com** using EmailJS. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Service ID
1. In EmailJS dashboard, click on **Email Services**
2. Click **Add Service** → Select **Gmail**
3. Click **Connect Account** and authorize your Gmail account
4. Name the service (e.g., "Gmail")
5. Copy the **Service ID** (starts with `service_`)

## Step 3: Create Email Templates

### Template 1: Contact Form
1. Go to **Email Templates**
2. Click **Create New Template**
3. Name: "Contact Form"
4. Set **To Email**: `maledenzel@gmail.com`
5. Use this template:

```
Subject: New Contact Form Submission from {{from_name}}

📧 Submitter Email: {{from_email}}
👤 Name: {{from_name}}
📝 Subject: {{subject}}

--- Message ---
{{message}}

--- Reply to: {{from_email}} ---
```

6. Copy the **Template ID** (starts with `template_`)

### Template 2: Proposal Form
1. Click **Create New Template**
2. Name: "Proposal Form"
3. Set **To Email**: `maledenzel@gmail.com`
4. Use this template:

```
Subject: New Proposal Submission from {{from_name}}

📧 Submitter Email: {{from_email}}
👤 Name: {{from_name}}
💼 Interest Type: {{interest_type}}

--- Proposal ---
{{proposal_message}}

--- Reply to: {{from_email}} ---
```

6. Copy the **Template ID** (starts with `template_`)

## Step 4: Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (starts with `key_`)

## Step 5: Update Environment Variables
1. Open `.env.local` in the project root
2. Fill in the values:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_CONTACT=your_contact_template_id_here
VITE_EMAILJS_TEMPLATE_PROPOSAL=your_proposal_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test the Forms
1. Restart your development server: `npm run dev`
2. Go to the Contact page and submit a test message
3. Go to the Opportunities page and submit a test proposal
4. Check your email at maledenzel@gmail.com

## Troubleshooting

- **"Missing environment variables" error**: Make sure `.env.local` is in the project root and the development server was restarted
- **Emails not arriving**: Check EmailJS template formatting and ensure templates are published
- **CORS error**: Make sure your Public Key is correctly set in `.env.local`

## Forms Connected
✅ Contact Page - "Send us a Message" form
✅ Opportunities Page - "Submit Your Proposal" form

Both forms now send emails to: **maledenzel@gmail.com**
