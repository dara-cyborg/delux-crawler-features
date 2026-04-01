# Facebook App Review: pages_read_engagement Permission Guide

## Overview
This document outlines how Delux Crawler will use the `pages_read_engagement` permission in accordance with Facebook's Platform Policies and API requirements.

---

## 1. Permission: pages_read_engagement

### Official Definition
`pages_read_engagement` allows an app to read engagement data from the public content on a Facebook Page. This includes metrics such as:
- Comments on Page posts
- Likes on Page posts
- Reactions on Page posts
- Shares on Page posts
- Engagement insights and analytics

### Required Prerequisite
**IMPORTANT:** To use `pages_read_engagement`, the app MUST also include the `pages_show_list` permission to:
- List the pages managed by the user
- Display which pages the user can access
- Enable proper page selection and authorization flow

---

## 2. How Delux Crawler Uses pages_read_engagement

### Primary Use Case: Live Selling Management
Delux Crawler is a live-selling workflow optimization tool designed specifically for Cambodia's e-commerce market. The app uses `pages_read_engagement` for:

#### A. Real-Time Comment Capture
- **Purpose:** Capture and extract comments from the user's Facebook live selling streams
- **Data Used:** Comment text, commenter name, timestamp, and engagement metrics
- **Benefit:** Allows businesses to track customer inquiries during live sales sessions

#### B. Engagement Analytics
- **Purpose:** Provide merchants with insights into customer engagement during live selling
- **Data Used:** Comment counts, reaction types, reply rates, engagement trends
- **Benefit:** Help merchants understand which products/messaging resonates with their audience

#### C. Response Management
- **Purpose:** Enable faster response to customer comments and inquiries
- **Data Used:** Read engagement data to prioritize responses (high engagement comments, customer questions)
- **Benefit:** Improve customer service speed and satisfaction during live sales

#### D. Order Fulfillment Integration
- **Purpose:** Extract customer information from comments to facilitate order fulfillment
- **Data Used:** Customer inquiries parsed from comments (payment info, delivery questions, product details)
- **Benefit:** Streamline the process from live selling to order fulfillment

### Data Processing Flow
```
Facebook Page Live Stream
        ↓
pages_read_engagement API Call
        ↓
Extract Comments & Engagement Data
        ↓
Parse Customer Information
        ↓
Display in Delux Crawler Dashboard
        ↓
Merchant Reviews & Responds
        ↓
Order Fulfillment
```

---

## 3. API Endpoints Used

### Primary Graph API Endpoints with pages_read_engagement

#### 1. Page Feed (Comments)
```
GET /v20.0/{page-id}/feed
Fields: message, created_time, from, story, permalink_url
Scope: pages_read_engagement
```

#### 2. Post Comments
```
GET /v20.0/{post-id}/comments
Fields: id, created_time, from, message, like_count, user_likes
Scope: pages_read_engagement
```

#### 3. Comment Details
```
GET /v20.0/{comment-id}
Fields: id, message, created_time, from, attachment, user_likes, like_count
Scope: pages_read_engagement
```

#### 4. Page Insights (Engagement Metrics)
```
GET /v20.0/{page-id}/insights
Metric: engagement (includes comments, likes, shares, reactions)
Scope: pages_read_engagement
```

#### 5. Page Admin Assignment
```
GET /v20.0/{page-id}/administrators
Scope: manage_pages (prerequisite)
```

---

## 4. Permission Requirements & Compliance

### Required Permissions (In Addition to pages_read_engagement)
- ✅ `pages_show_list` - **MANDATORY** to list and select pages
- ✅ `pages_manage_metadata` - To read page information
- ✅ `pages_read_user_content` - To read user-generated content on pages
- ⚠️ `implicit` - For basic user identity

### User Authorization Flow
```
1. User Initiates Login
   ↓
2. OAuth Authorization Dialog Appears
   ↓
3. User Grants: pages_show_list, pages_read_engagement, pages_manage_metadata
   ↓
4. User Selects Page(s) to Manage
   ↓
5. App Receives Page Access Token
   ↓
6. App Can Now Read Engagement Data
```

---

## 5. Data Retention & User Privacy

### Data Collection Practices
- **Real-Time Only:** Data is read directly from Facebook API, not stored permanently
- **Session-Based:** Engagement data is processed during active user sessions
- **User Control:** Users can revoke access anytime through Facebook Settings
- **Minimal Storage:** Only essential transaction data (order info) is stored, not engagement metrics

### Privacy Compliance
- ✅ No tracking of individual users without their knowledge
- ✅ Data used only for the stated purpose (live selling management)
- ✅ Compliance with Facebook's Platform Policies
- ✅ Compliance with Facebook's Data Use Policies
- ✅ GDPR compliant data handling
- ✅ User consent obtained via OAuth flow

---

## 6. API Test Calls Performed

### Test Scenario 1: Authenticated Page Access
```javascript
// Test: User logs in and grants pages_read_engagement permission
GET /v20.0/me/accounts

Response:
{
  "data": [
    {
      "access_token": "PAGE_ACCESS_TOKEN",
      "category": "E-commerce",
      "name": "My Live Selling Page",
      "id": "PAGE_ID"
    }
  ]
}
```

### Test Scenario 2: Retrieve Page Comments
```javascript
// Test: Fetch comments from a live stream post
GET /v20.0/POST_ID/comments

Parameters:
- fields: id,message,created_time,from,attachment
- access_token: PAGE_ACCESS_TOKEN

Response:
{
  "data": [
    {
      "created_time": "2026-03-31T10:30:00+0000",
      "from": {
        "name": "Customer Name",
        "id": "USER_ID"
      },
      "message": "Is this product available? What's the price?",
      "id": "COMMENT_ID"
    }
  ],
  "paging": {
    "cursors": {
      "before": "...",
      "after": "..."
    }
  }
}
```

### Test Scenario 3: Retrieve Engagement Insights
```javascript
// Test: Get page engagement metrics
GET /v20.0/PAGE_ID/insights

Parameters:
- metric: engagement,page_fan_adds
- access_token: PAGE_ACCESS_TOKEN

Response:
{
  "data": [
    {
      "name": "engagement",
      "period": "day",
      "values": [
        {
          "value": 156,
          "end_time": "2026-03-31T23:00:00+0000"
        }
      ]
    }
  ]
}
```

### Test Scenario 4: Error Handling
```javascript
// Test: Handle permission errors
GET /v20.0/POST_ID/comments

// Response when pages_read_engagement is missing:
{
  "error": {
    "message": "An access token is required to request this resource.",
    "type": "OAuthException",
    "code": 104
  }
}

// Handled by: Prompting user to re-authorize with required permissions
```

---

## 7. Allowed Usage - What We Will Do ✅

### ✅ Approved Uses
1. Display real-time comments from Facebook Page posts during live selling
2. Extract customer inquiries and product questions from comments
3. Provide engagement metrics and analytics to the Page owner
4. Help categorize and prioritize customer response needs
5. Track engagement trends to optimize live selling strategies
6. Facilitate order fulfillment based on customer comments
7. Generate reports on customer engagement and sales performance

### ❌ Prohibited Uses
1. ❌ Sell or license engagement data to third parties
2. ❌ Use data for targeted advertising without user consent
3. ❌ Store engagement data beyond the session lifetime
4. ❌ Share data with non-Page-admin users
5. ❌ Use data for purposes outside of live selling management
6. ❌ Track individual users across unrelated websites/apps
7. ❌ Combine engagement data with personally identifiable information for marketing

---

## 8. Compliance Agreement

### We Certify That:

✅ **Data Usage Compliance**
- Delux Crawler uses `pages_read_engagement` only to display and manage engagement data for the Facebook Page owner
- Data is used exclusively for live selling workflow optimization
- No data is sold, licensed, or shared with unauthorized third parties

✅ **User Privacy**
- Users are informed of data usage through our Privacy Policy
- Page access can be revoked at any time through Facebook settings
- Data is processed securely and stored minimally

✅ **API Best Practices**
- We follow Facebook's API Rate Limiting guidelines
- We implement proper error handling and retry logic
- We maintain up-to-date API versions (currently v20.0)
- We respect user permissions and scopes

✅ **Policy Adherence**
- We comply with Facebook's Platform Policies
- We comply with Data Use Policies
- We comply with Facebook Apps Terms
- We comply with applicable data protection regulations (GDPR, CCPA, etc.)

✅ **Required Permissions**
- Application includes both `pages_show_list` AND `pages_read_engagement`
- `pages_show_list` is required and properly implemented
- Permissions are requested in the proper OAuth flow

---

## 9. Technical Implementation

### Backend Code Example (Node.js)

```javascript
const axios = require('axios');

class FacebookPageEngagement {
  constructor(pageAccessToken) {
    this.pageAccessToken = pageAccessToken;
    this.apiVersion = 'v20.0';
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  // Get page comments with pages_read_engagement permission
  async getPageComments(pageId, postId) {
    try {
      const url = `${this.baseUrl}/${postId}/comments`;
      const response = await axios.get(url, {
        params: {
          fields: 'id,message,created_time,from,attachment,like_count',
          access_token: this.pageAccessToken,
          limit: 50 // Pagination limit
        }
      });

      return {
        success: true,
        comments: response.data.data,
        paging: response.data.paging
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        comments: []
      };
    }
  }

  // Get engagement metrics
  async getEngagementMetrics(pageId, metric = 'engagement') {
    try {
      const url = `${this.baseUrl}/${pageId}/insights`;
      const response = await axios.get(url, {
        params: {
          metric: metric,
          access_token: this.pageAccessToken,
          date_preset: 'last_30d'
        }
      });

      return {
        success: true,
        metrics: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        metrics: []
      };
    }
  }

  // Get user's managed pages (pages_show_list)
  async getManagedPages(userAccessToken) {
    try {
      const url = `${this.baseUrl}/me/accounts`;
      const response = await axios.get(url, {
        params: {
          fields: 'id,name,category,access_token',
          access_token: userAccessToken
        }
      });

      return {
        success: true,
        pages: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        pages: []
      };
    }
  }
}

module.exports = FacebookPageEngagement;
```

### Frontend Integration Example

```javascript
// React Component Example
import React, { useState, useEffect } from 'react';

function LiveSellingComments({ pageId, postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/facebook/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId, postId })
        });

        const data = await response.json();
        
        if (data.success) {
          setComments(data.comments);
        } else {
          setError(data.error.message);
        }
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
    
    // Refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, [pageId, postId]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="comments-container">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <strong>{comment.from.name}</strong>
          <p>{comment.message}</p>
          <small>{new Date(comment.created_time).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default LiveSellingComments;
```

---

## 10. End-to-End User Experience Flow

### Step 1: Authorization
```
User clicks "Connect Facebook Account"
      ↓
Facebook OAuth Dialog appears
      ↓
Dialog requests: pages_show_list, pages_read_engagement, pages_manage_metadata
      ↓
User clicks "Allow"
      ↓
Delux Crawler receives access token
```

### Step 2: Page Selection
```
Dashboard shows: "Select a Page to Manage"
      ↓
Dropdown lists all user's managed pages (via pages_show_list)
      ↓
User selects: "My Live Selling Page"
      ↓
App stores page selection
```

### Step 3: Live Selling Session
```
User starts Facebook live stream
      ↓
Delux Crawler dashboard shows: "Going Live..."
      ↓
Real-time comments appear in the sidebar
      ↓
Comments show: Customer name, comment text, timestamp
      ↓
Engagement metrics update live: "234 comments, 5.2K reactions"
```

### Step 4: Response & Fulfillment
```
Merchant reviews incoming comments
      ↓
Clicks on comment: "Is this product available?"
      ↓
App suggests quick response options
      ↓
Or merchant extracts customer info for order processing
      ↓
Comment marked as "responded" or "processed"
```

### Step 5: Analytics
```
After live session ends
      ↓
Dashboard shows engagement report:
  - Total comments: 2,340
  - Peak engagement time: 8:45 PM
  - Top product mentioned: "Product XYZ"
  - Customer conversion rate: 12.5%
      ↓
Merchant exports report for further analysis
```

---

## 11. Recommended App Manifest Entry

Add to `app.json` or equivalent:

```json
{
  "facebookApp": {
    "appName": "Delux Crawler",
    "permissionsRequested": [
      "pages_show_list",
      "pages_read_engagement",
      "pages_manage_metadata",
      "pages_read_user_content"
    ],
    "expectedDataUsage": {
      "comments": "Read real-time comments from live selling streams",
      "engagement": "Analyze engagement metrics and trends",
      "pageInfo": "Display page name and basic information",
      "userData": "Identify page administrators and commenter information"
    },
    "dataRetention": {
      "durationDays": 1,
      "storageType": "Session only",
      "permanentStorage": "Order fulfillment data only"
    },
    "complianceUrl": "https://features.dara-crawler.xyz/#privacy"
  }
}
```

---

## 12. FAQ

### Q: Why is pages_show_list required?
**A:** `pages_show_list` allows your app to list the Facebook Pages the user manages. This is essential for:
- Letting users select which page to manage
- Verifying user has admin access to the page
- Obtaining the page access token

Without it, the app cannot determine which pages have `pages_read_engagement` permission.

### Q: Can we store comments permanently?
**A:** No. Per Facebook's policies:
- Comments should not be stored long-term
- Store only transaction/order data
- Comments are read real-time from Facebook API
- This ensures data freshness and user privacy

### Q: What happens if a user revokes the permission?
**A:** The app will:
1. Receive an OAuthException error on next API call
2. Display a message: "Please reconnect your Facebook account"
3. Redirect to Facebook authorization screen
4. User re-authenticates with required permissions

### Q: Can we share comment data with a third-party printer service?
**A:** Only if:
- User explicitly grants consent
- Data is used only for order printing
- Third party signs data processing agreement
- Data is not stored beyond immediate use

### Q: How often should we call the API?
**A:** Recommended:
- Every 2-5 seconds during live stream (real-time updates)
- Once per hour during non-live periods
- Do not exceed Facebook's rate limits (usually 200 calls/user/hour)

---

## 13. Support & Contact

For questions about Delux Crawler's Facebook integration:
- **Support Email:** support@deluxcrawler.com
- **Facebook Integration:** facebook@deluxcrawler.com
- **Privacy Policy:** https://features.dara-crawler.xyz/#privacy

---

**Document Version:** 1.0
**Last Updated:** March 31, 2026
**Facebook API Version:** v20.0
**Status:** Ready for App Review Submission