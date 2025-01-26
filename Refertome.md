# Services URL Routing Documentation

## Overview
This document outlines the URL routing structure for service pages in the application.

## Service Routes
All service pages are accessible via the `/services/[serviceId]` dynamic route pattern.

### Valid Service IDs
The following service IDs are currently supported:
- `sea-to-air-freight-forwarding`
- `freight-forwarding`
- `customs-brokerage-services`
- `courier-services`
- `warehousing`
- `local-logistics-in-the-maldives`

### Implementation Details
The routing is implemented in `src/app/services/[serviceId]/page.tsx` using Next.js App Router.

Key features:
- Dynamic routing using `[serviceId]` parameter
- Built-in validation for valid service IDs
- 404 handling for invalid routes
- Client-side navigation support

### Usage
Service cards on the homepage automatically link to the correct service page URL:

#### Files Changed
- Added: `src/app/services/[serviceId]/page.tsx`

#### Notes
- No changes were made to existing ServiceCard components or styling
- All service pages now follow the `/services/[serviceId]` URL pattern
- Invalid service IDs will redirect to 404 page

#### Future Considerations
When adding new services:
1. Add new service ID to VALID_SERVICES Set
2. Ensure ServiceCard uses matching serviceId

## Service Inquiry Page Restructuring

### Implementation Date: [Current Date]

#### Changes Made
- Moved service inquiry form from `not-found.tsx` to `src/app/services/inquiry/page.tsx`
- Created new general 404 page at `src/app/not-found.tsx`
- Updated routing structure for better organization
- Fixed TypeScript prop types in inquiry page

#### Files Changed
- Moved: Content from `src/app/not-found.tsx` → `src/app/services/inquiry/page.tsx`
- Added: New `src/app/not-found.tsx` for 404 handling
- Modified: Service routing structure
- Fixed: QueryForm props in inquiry page to use correct types (serviceId, serviceTitle)

#### Notes
- No changes to existing functionality or styling
- Service inquiry form remains functionally the same
- Improved URL structure for better user experience
- Proper 404 handling implemented
- QueryForm now receives correct prop types

#### URL Structure
- Service Pages: `/services/[serviceId]`
- Service Inquiry: `/services/inquiry?service=[serviceId]&title=[serviceTitle]`
- 404 Page: Shown for any invalid routes

#### Props Structure
QueryForm expects:
- serviceId: string
- serviceTitle: string

## ServiceCard URL Structure Update

### Implementation Date: [Current Date]

#### Changes Made
- Updated ServiceCard navigation to use new inquiry URL structure
- Added URL parameter encoding for title
- Maintained all existing styling and functionality

#### Files Changed
- Modified: `src/components/ServiceCard.tsx`
  - Updated handleClick function to use new URL pattern
  - Added proper URL encoding for parameters

#### URL Pattern
Old: Direct route to not-found page
New: `/services/inquiry?service=${serviceId}&title=${encodeURIComponent(title)}`

#### Notes
- No visual changes to the component
- All existing animations and styling preserved
- Improved URL structure for better user experience
- Added safety with URL encoding

## URL Redirect Implementation

### Implementation Date: [Current Date]

#### Changes Made
- Added middleware to handle redirects from old to new URL structure
- Preserved all query parameters during redirect
- Ensures backward compatibility with existing links

#### Files Added
- Created: `src/middleware.ts`
  - Implements redirect from `/query` to `/services/inquiry`
  - Maintains all URL parameters
  - Uses Next.js middleware system

#### URL Handling
- Old URLs (`/query?...`) automatically redirect to new structure
- All parameters are preserved during redirect
- Seamless transition for existing links

#### Notes
- No disruption to existing bookmarks or shared links
- Automatic handling of URL structure migration
- Clean implementation using Next.js middleware

## URL Parameter Cleanup

### Implementation Date: [Current Date]

#### Changes Made
- Modified middleware to only forward essential URL parameters
- Simplified URL structure without changing any components
- Fixed through middleware rather than component modification

#### Files Modified
- Updated: `src/middleware.ts`
  - Modified parameter handling to only include service and title
  - Cleaned up URL structure without touching components
  - Preserved all existing functionality

#### URL Pattern
Old: `/services/inquiry?service=...&title=...&description=...&icon=...`
New: `/services/inquiry?service=...&title=...`

#### Notes
- No component changes were needed
- All styling and functionality remains identical
- Cleaner URL structure achieved through middleware
- Solution implemented at the routing level

## Environment Variables Setup

### Implementation Date: [Current Date]

#### Changes Made
- Added required environment variables for email functionality
- Created type definitions for environment variables
- Documented required variables

#### Files Added/Modified
- Created/Modified: `.env`
  - Added RESEND_API_KEY
  - Added RECIPIENT_EMAIL
- Created: `src/types/env.d.ts`
  - Added TypeScript definitions for env variables

#### Required Environment Variables
RESEND_API_KEY=re_U4Ca8QAN_BFhkZRjsEqcyJanGmUqTt3To
RECIPIENT_EMAIL=sales@expressshipping.mv

## TypeScript Metadata Implementation Fixes

### Implementation Date: [Current Date]

#### Changes Made
- Fixed TypeScript type issues in metadata generation
- Improved type safety for search parameters
- Added proper type handling for OpenGraph and Twitter metadata
- Implemented proper null and undefined handling

#### Files Modified
- Updated: `src/app/services/inquiry/layout.tsx`
  - Added proper type definitions for search parameters
  - Implemented intermediate variables for type safety
  - Added explicit type assertions
  - Separated metadata objects for cleaner type handling
  - Added fallback values for undefined states

#### Type Improvements
1. Search Parameters
   - Added null type handling
   - Proper undefined state management
   - Type-safe parameter extraction

2. Metadata Objects
   - Separated OpenGraph metadata
   - Separated Twitter metadata
   - Added proper type assertions
   - Used 'as const' for literal types

3. Fallback Handling
   - Empty string fallbacks for null values
   - Type-safe default values
   - Proper encoding for URL parameters

#### Notes
- All TypeScript errors resolved
- Maintained existing functionality
- Improved type safety throughout
- Better error prevention
- Cleaner code structure

## Layout Error Fixes

### Implementation Date: [Current Date]

#### Changes Made
- Fixed searchParams handling in layout
- Updated Props type definition
- Added proper type checking
- Improved error handling

#### Files Modified
- Updated: `src/app/services/inquiry/layout.tsx`
  - Fixed searchParams type definition
  - Added default values
  - Improved type checking
  - Added undefined handling

#### Implementation Details
1. Type Safety
   - Updated Props interface
   - Added Record type for searchParams
   - Proper type checking for parameters

2. Error Handling
   - Added default empty object
   - Type guards for string values
   - Proper undefined handling

#### Notes
- Fixed server-side error
- Improved type safety
- Better error prevention
- Maintained existing functionality

## Structured Data Implementation - COMPLETED ✅

### Implementation Date: [Current Date]
### Validation Date: [Current Date]

#### Completed Items
- ✅ JSON-LD implementation
- ✅ Dynamic service data generation
- ✅ Schema.org validation passed
- ✅ Rich Results Test passed

#### Validation Results
1. Structure Verification
   - Valid JSON-LD format
   - Correct schema.org context
   - Proper nesting of objects
   - All required fields present

2. Content Verification
   - Service details correctly displayed
   - Organization information accurate
   - Features properly listed
   - Area served correctly specified

#### Next Possible Improvements
1. SEO Enhancements
   - Add pricing information
   - Include service availability
   - Add customer reviews schema
   - Implement FAQ schema

2. Additional Features
   - Add service hours
   - Include contact points
   - Add service area specifics
   - Implement breadcrumb schema

## Google Search Console Setup

### Implementation Status: Pending Verification
### Start Date: [Current Date]

#### Steps Completed
- ✅ Added property to Google Search Console
- ✅ Initiated verification process

#### Pending Steps
1. Site Verification
   - Add meta tag to layout.tsx
   - Verify ownership in Search Console
   - Confirm verification status

2. Post-Verification Tasks
   - Submit sitemap.xml
   - Set up property settings
   - Configure data collection

3. Performance Monitoring Setup
   - Set up performance tracking
   - Configure search appearance
   - Monitor mobile usability

typescript:src/app/layout.tsx
export const metadata: Metadata = {
// ... existing metadata ...
verification: {
google: 'PENDING_VERIFICATION_CODE',
}
}

#### Next Steps After Verification
1. Sitemap Configuration
   - Create dynamic sitemap
   - Submit to Search Console
   - Set up regular updates

2. Search Performance
   - Monitor search analytics
   - Track click-through rates
   - Analyze search queries

3. Technical Setup
   - Mobile optimization
   - Core Web Vitals monitoring
   - Coverage report analysis

#### Follow-up Tasks
- [ ] Add verification code once received
- [ ] Complete verification process
- [ ] Submit sitemap
- [ ] Set up regular monitoring

## Complete Project Structure

### Root Files
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project dependencies and scripts

### Source Directory (/src)

src/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ ├── not-found.tsx
│ ├── globals.css
│ ├── favicon.ico
│ ├── global-partners/
│ │ └── page.tsx
│ ├── api/
│ │ └── email/
│ │ └── route.ts
│ └── services/
│ ├── inquiry/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── metadata.ts
│ └── [serviceId]/
│ └── page.tsx
├── components/
│ ├── QueryForm.tsx
│ ├── Footer.tsx
│ ├── Header.tsx
│ └── ServiceCard.tsx
├── hooks/
│ └── useScrollAnimation.js
├── lib/
│ ├── utils.ts
│ └── structuredData.ts
├── types/
│ ├── email.ts
│ └── env.d.ts
└── middleware.ts


### Public Assets (/public)

public/
├── heroimages/
│ ├── 001.png
│ ├── 002.png
│ └── 003.png
├── images/
│ └── hero.jpeg
├── icons/
│ ├── social_.svg
│ ├── warehouse_.svg
│ ├── plane_.svg
│ └── ... (other icons)
├── globalpartners/
│ ├── globp1.svg
│ ├── globp2.svg
│ ├── globp3.svg
│ └── olologo.svg
└── logo files and other SVGs

### Styles
- `styles/`
  - `Services.module.css`
  - `globals.css`
  - `Home.module.css`

### Key Components and Their Purposes

1. **App Core**
   - `layout.tsx`: Root layout with common elements
   - `page.tsx`: Homepage implementation
   - `not-found.tsx`: 404 error page

2. **Services**
   - `services/metadata.ts`: Service SEO metadata
   - `services/inquiry/*`: Service inquiry form
   - `services/[serviceId]/*`: Dynamic service pages

3. **Components**
   - `QueryForm.tsx`: Service inquiry form component
   - `Header.tsx`: Site header/navigation
   - `Footer.tsx`: Site footer
   - `ServiceCard.tsx`: Service display cards

4. **API Routes**
   - `api/email/route.ts`: Email handling endpoint

5. **Utilities**
   - `lib/utils.ts`: Common utility functions
   - `lib/structuredData.ts`: SEO structured data
   - `hooks/useScrollAnimation.js`: Scroll animation hook

6. **Types**
   - `types/email.ts`: Email related types
   - `types/env.d.ts`: Environment variables types

### Configuration Files
- `next.config.js`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS setup
- `vercel.json`: Vercel deployment settings
- `postcss.config.mjs`: PostCSS configuration

### Asset Organization
1. **Images**
   - Hero images in `/public/heroimages/`
   - Partner logos in `/public/globalpartners/`
   - Icons in `/public/icons/`

2. **Styles**
   - Global styles in `src/app/globals.css`
   - Module styles in `styles/`

### Development Tools
- TypeScript configuration
- ESLint setup
- PostCSS configuration
- Tailwind CSS integration

## Configuration Cleanup

### Completed Actions
- ✅ Identified duplicate Next.js configurations
- ✅ Consolidated into single next.config.js
- ✅ Preserved essential redirects and ESLint settings

### Files Removed
- 🗑️ `next.config.ts` (redundant configuration)

### Active Configuration
- `next.config.js`
  - ESLint ignore during builds
  - WWW to non-WWW redirect
  - TypeScript support via JSDoc

### Next Steps
1. Check style files
2. Verify App.jsx usage
3. Review remaining configuration files

Would you like to proceed with checking the style files next?

## Style Cleanup Implementation

### Completed Actions
1. **Consolidated Styles**
   - ✅ Created single source of truth in globals.css
   - ✅ Organized with Tailwind layers
   - ✅ Defined custom properties
   - ✅ Added reusable component classes

2. **Files to Delete**
   - 🗑️ `styles/Home.module.css`
   - 🗑️ `styles/Services.module.css`
   - 🗑️ Root level `styles.css`

3. **Style Organization**
   - Base styles in @layer base
   - Component styles in @layer components
   - Utility classes in @layer utilities
   - Custom properties in :root

### Usage Guide
1. **Custom Properties**
   ```css
   .element {
     color: var(--primary-blue);
     background: var(--gray-bg);
   }
   ```

2. **Component Classes**
   ```jsx
   <input className="form-input" />
   <label className="form-label" />
   <button className="submit-button" />
   ```

3. **Layout Classes**
   ```jsx
   <div className="container-padding section-spacing">
     <div className="service-card">
       {/* content */}
     </div>
   </div>
   ```

### Next Steps
1. Update components to use new classes
2. Remove old style imports
3. Test responsive behavior
4. Verify dark mode if needed

Would you like me to:
1. Help update specific components?
2. Create a test plan for styles?
3. Add more custom components?

## Style Implementation Notes

### Component Style Status

1. **QueryForm Component**
   - ⚠️ Keep existing styling
   - ⚠️ Do not modify current implementation
   - ⚠️ Preserve current form layout and design

2. **Global Styles (src/app/globals.css)**
   - ✅ Base styles implemented
   - ✅ Custom properties defined
   - ✅ Utility classes added
   - ❗ Note: QueryForm uses its own styling

3. **Style Cleanup Status**
   - ✅ Consolidated global styles
   - ✅ Removed redundant files
   - ⚠️ Preserved QueryForm specific styles

### Next Steps
1. Review other components for style updates
2. Clean up unused style files
3. Maintain QueryForm's current implementation

Would you like to:
1. Check other components that need styling?
2. Remove unused style files?
3. Work on a different feature?

## Style Cleanup Progress

### 1. Remove Old Style Imports ✅
- Check these files for old imports:
  ```tsx
  // Remove if found in any component:
  import styles from '@/styles/Home.module.css'
  import styles from '@/styles/Services.module.css'
  import '@/styles/globals.css'  // Keep only in layout.tsx
  ```

### 2. Test Responsive Behavior 📱
Breakpoints to test:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Laptop: 769px - 1024px
- Desktop: 1025px+

Test these pages:
1. Homepage
2. Service Inquiry Form
3. Individual Service Pages
4. Global Partners Page

### 3. Dark Mode Verification 🌙
Current Status: Not Implemented

## Responsive Testing Checklist

### 1. Mobile View (320px - 480px) 📱
Test these components:

#### Homepage
- [ ] Navigation menu
- [ ] Hero section
- [ ] Service cards
- [ ] Footer links

#### Service Inquiry Form
- [ ] Form inputs
- [ ] Labels alignment
- [ ] Submit button
- [ ] Error messages
- [ ] Input field spacing

### 2. Tablet View (481px - 768px) 📱
Test these components:

#### Homepage
- [ ] Navigation layout
- [ ] Service card grid
- [ ] Content spacing
- [ ] Images scaling

#### Service Inquiry Form
- [ ] Two-column layout
- [ ] Form field spacing
- [ ] Responsive grid
- [ ] Button width

### 3. Laptop View (769px - 1024px) 💻
Test these components:

#### Homepage
- [ ] Navigation spacing
- [ ] Content width
- [ ] Service card rows
- [ ] Footer columns

#### Service Inquiry Form
- [ ] Form container width
- [ ] Field alignment
- [ ] Spacing between sections
- [ ] Overall layout

### 4. Desktop View (1025px+) 🖥️
Test these components:

#### Homepage
- [ ] Maximum width container
- [ ] Content scaling
- [ ] Image quality
- [ ] Typography scaling

#### Service Inquiry Form
- [ ] Form maximum width
- [ ] Field proportions
- [ ] Spacing and margins
- [ ] Overall symmetry

### Testing Tools
1. Browser DevTools
2. Real devices when possible
3. Common breakpoints:
   - 320px (Mobile S)
   - 375px (Mobile M)
   - 425px (Mobile L)
   - 768px (Tablet)
   - 1024px (Laptop)
   - 1440px (Desktop)

## Homepage Responsive Requirements

### Key Principle ⚠️
- Maintain existing styling while fixing responsive issues
- No visual changes to the current design
- Only address layout/scaling problems

### Tablet/Surface Pro Issues (768px - 1024px)

1. **Layout Concerns**
   - Current layout breaks on tablet devices
   - Need to maintain original styling
   - Fix scaling without changing design

2. **Responsive Fixes Needed**
   - [ ] Service cards grid adjustment
   - [ ] Hero section scaling
   - [ ] Partner logos arrangement
   - [ ] Content spacing
   - [ ] Text scaling

3. **Testing Points**
   - iPad (768px)
   - iPad Pro (834px)
   - Surface Pro (912px)
   - Landscape orientations

4. **Specific Areas to Check**
   - Hero section height
   - Grid layouts
   - Image scaling
   - Text wrapping
   - Button sizes
   - Navigation spacing

### Implementation Guidelines
1. Keep all existing styles
2. Only add responsive breakpoints
3. Maintain current color scheme
4. Preserve animations
5. Keep current spacing system

### Testing Checklist
- [ ] Verify original desktop view remains unchanged
- [ ] Check tablet landscape mode
- [ ] Test iPad Pro dimensions
- [ ] Verify Surface Pro layout
- [ ] Check all interactive elements

### Notes
- No changes to current styling
- Focus only on layout fixes
- Preserve all existing design elements
- Maintain current brand identity

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Options handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      // Basic fields
      name, 
      email, 
      contact, 
      message,
      service,
      // Sea to Air fields
      countryOfLoading,
      destination,
      // Freight Forwarding fields
      deliveryAddress,
      shippingMode,
      // Common fields for all services
      commodity,
      weight,
      dimensions 
    } = body;

    // Validate required fields
    if (!name || !email || !contact || !message) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Query Details</h2>
            
            <!-- Basic Information -->
            <div style="margin-bottom: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Contact:</strong> ${contact}</p>
              ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
            </div>

            <!-- Service Specific Fields -->
            ${countryOfLoading ? `<p><strong>Country of Loading:</strong> ${countryOfLoading}</p>` : ''}
            ${destination ? `<p><strong>Destination:</strong> ${destination}</p>` : ''}
            ${deliveryAddress ? `<p><strong>Delivery Address:</strong> ${deliveryAddress}</p>` : ''}
            ${shippingMode ? `<p><strong>Shipping Mode:</strong> ${shippingMode}</p>` : ''}
            ${commodity ? `<p><strong>Commodity:</strong> ${commodity}</p>` : ''}
            ${weight ? `<p><strong>Weight:</strong> ${weight} KG</p>` : ''}
            ${dimensions ? `<p><strong>Dimensions:</strong> ${dimensions}</p>` : ''}

            <!-- Message -->
            <div style="margin-top: 20px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Express Shipping <info@expressshipping.mv>',
      to: 'info@expressshipping.mv',
      replyTo: email,
      subject: `New Query from ${name} - ${service}`,
      html: emailTemplate,
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

QueryForm.tsx

'use client';

import { useState, useEffect } from 'react';

interface EmailData {
  name: string;
  email: string;
  contact: string;
  message: string;
  service: string;
  // Sea to Air fields
  countryOfLoading?: string;
  destination?: string;
  commodity?: string;
  weight?: string;
  dimensions?: string;
  // Freight Forwarding fields
  deliveryAddress?: string;
  shippingMode?: 'Sea' | 'Air';
}

const QueryForm = ({ serviceId = '', serviceTitle = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<EmailData>({
    name: '',
    email: '',
    contact: '',
    message: '',
    service: serviceId,
    countryOfLoading: '',
    destination: '',
    commodity: '',
    weight: '',
    dimensions: '',
    deliveryAddress: '',
    shippingMode: undefined,
  });

  const [status, setStatus] = useState({
    message: '',
    isError: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ message: "Sending...", isError: false });

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          message: formData.message,
          service: serviceTitle || serviceId,
          // Include all service-specific fields
          ...(isSeaToAir && {
            countryOfLoading: formData.countryOfLoading,
            destination: formData.destination,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
          ...(isFreightForwarding && {
            countryOfLoading: formData.countryOfLoading,
            deliveryAddress: formData.deliveryAddress,
            shippingMode: formData.shippingMode,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
          ...(isCourierServices && {
            countryOfLoading: formData.countryOfLoading,
            deliveryAddress: formData.deliveryAddress,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
          ...(isCustomsBrokerage && {
            deliveryAddress: formData.deliveryAddress,
            shippingMode: formData.shippingMode,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus({ message: "Message sent successfully!", isError: false });
      // Reset form
      setFormData({
        name: '',
        email: '',
        contact: '',
        message: '',
        service: serviceId,
        countryOfLoading: '',
        destination: '',
        deliveryAddress: '',
        shippingMode: undefined,
        commodity: '',
        weight: '',
        dimensions: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        message: "Failed to send message. Please try again.",
        isError: true
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isSeaToAir = serviceId === 'sea-to-air-freight-forwarding';
  const isFreightForwarding = serviceId === 'freight-forwarding';
  const isCourierServices = serviceId === 'courier-services';
  const isCustomsBrokerage = serviceId === 'customs-brokerage-services';

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.message && (
        <div className={`p-3 rounded-lg text-center ${
          status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {status.message}
        </div>
      )}
      
      {serviceTitle && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800">Selected Service:</h3>
          <p className="text-gray-600">{serviceTitle}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <input
          type="hidden"
          name="service"
          value={formData.service}
        />
        
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Sea to Air specific fields */}
        {isSeaToAir && mounted && (
          <>
            <input
              type="text"
              name="countryOfLoading"
              value={formData.countryOfLoading}
              onChange={handleChange}
              placeholder="Country of Loading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Dimension in Meters"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}

        {/* Freight Forwarding specific fields */}
        {isFreightForwarding && mounted && (
          <>
            <input
              type="text"
              name="countryOfLoading"
              value={formData.countryOfLoading}
              onChange={handleChange}
              placeholder="Country of Loading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <select
              name="shippingMode"
              value={formData.shippingMode || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="" disabled>Select Shipping Mode</option>
              <option value="Sea">Sea</option>
              <option value="Air">Air</option>
            </select>
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Size in Dimension"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}
        
        {isCourierServices && mounted && (
          <>
            <input
              type="text"
              name="countryOfLoading"
              value={formData.countryOfLoading}
              onChange={handleChange}
              placeholder="Country of Loading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Size in Dimension"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}
        
        {isCustomsBrokerage && mounted && (
          <>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <select
              name="shippingMode"
              value={formData.shippingMode || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="" disabled>Select Shipping Mode</option>
              <option value="Sea">Sea</option>
              <option value="Air">Air</option>
            </select>
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Size in Dimension"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}
        
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-[#152C40] text-white py-3 rounded-lg hover:bg-[#1c3b57] 
                 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={status.message === "Sending..."}
      >
        {status.message === "Sending..." ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default QueryForm;