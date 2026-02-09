# PROMPT TO PERFECTION
## Mobile Onboarding Experience Template

---

## 📋 BRAND CONFIGURATION (Fill This Out First)

### Brand Identity
```
Brand Name: [Your Brand Name]
Brand Tagline/Concept: [e.g., "DO-ER" for Home Depot]
Primary Brand Color (Hex): [e.g., #f97316]
Secondary Brand Color (Hex): [e.g., #ffffff]
Accent Color (Hex): [e.g., #000000]
Font Family: [e.g., Inter, Roboto, etc.]
```

### Logo & Imagery
```
Logo URL: [URL to your brand logo]
Hero Image URL: [URL to main hero/banner image]
Promotional Image URLs: 
  - Banner 1: [URL]
  - Banner 2: [URL]
  - Banner 3: [URL]
  - Banner 4: [URL]
```

### Location Settings
```
Business Type: [e.g., Retail, Fitness, Restaurant, etc.]
Location Name Format: [e.g., "Store", "Gym", "Location", "Branch"]
Default Hours: [e.g., "Open Until 10:00 PM"]
```

### Onboarding Flow Customization

**User Data Collection Points:**
```
Account Info:
  - Username: [Yes/No]
  - Password: [Yes/No]
  - First Name: [Yes/No]
  - Last Name: [Yes/No - optional]
  - Email: [Yes/No - optional]

Personal Info:
  - Birthday: [Yes/No]
  - Zipcode/Location: [Yes/No]
  - Phone: [Yes/No - optional]
```

**Selection Categories (Customize 3 Selection Screens):**

```
SELECTION SCREEN 1:
Title: [e.g., "What type of home do you have?"]
Subtitle: [e.g., "Help us personalize your experience"]
Icon Type: [e.g., Home, Building, User, etc.]
Selection Type: [Single Select / Multi Select]
Options (4-6 options):
  1. [Option Name] - [Icon: lucide icon name]
  2. [Option Name] - [Icon: lucide icon name]
  3. [Option Name] - [Icon: lucide icon name]
  4. [Option Name] - [Icon: lucide icon name]
  5. [Option Name] - [Icon: lucide icon name]
  6. [Option Name] - [Icon: lucide icon name]

SELECTION SCREEN 2:
Title: [e.g., "What projects are you working on?"]
Subtitle: [e.g., "Select all that apply"]
Icon Type: [e.g., Wrench, Palette, etc.]
Selection Type: [Single Select / Multi Select]
Options (6-8 options):
  1. [Option Name] - [Icon: lucide icon name]
  2. [Option Name] - [Icon: lucide icon name]
  3. [Option Name] - [Icon: lucide icon name]
  4. [Option Name] - [Icon: lucide icon name]
  5. [Option Name] - [Icon: lucide icon name]
  6. [Option Name] - [Icon: lucide icon name]
  7. [Option Name] - [Icon: lucide icon name]
  8. [Option Name] - [Icon: lucide icon name]

SELECTION SCREEN 3:
Title: [e.g., "Where do you want to save?"]
Subtitle: [e.g., "Select your favorite categories"]
Icon Type: [e.g., Tag, Star, Heart, etc.]
Selection Type: [Single Select / Multi Select]
Options (6-8 options):
  1. [Option Name] - [Icon: lucide icon name]
  2. [Option Name] - [Icon: lucide icon name]
  3. [Option Name] - [Icon: lucide icon name]
  4. [Option Name] - [Icon: lucide icon name]
  5. [Option Name] - [Icon: lucide icon name]
  6. [Option Name] - [Icon: lucide icon name]
  7. [Option Name] - [Icon: lucide icon name]
  8. [Option Name] - [Icon: lucide icon name]
```

**Product Recommendations (Map Your Products):**

For each selection option above, provide at least 2 product mappings:
```
SELECTION SCREEN 1 - Option 1: [Option Name]
  Product 1: [Name] - [Price] - [Image URL or Unsplash Query]
  Product 2: [Name] - [Price] - [Image URL or Unsplash Query]

SELECTION SCREEN 1 - Option 2: [Option Name]
  Product 1: [Name] - [Price] - [Image URL or Unsplash Query]
  Product 2: [Name] - [Price] - [Image URL or Unsplash Query]

[Continue for all options across all 3 selection screens]
```

**Search Placeholder Mapping:**
```
For each selection option, provide a search term suggestion:
SELECTION SCREEN 1 - Option 1: [e.g., "lawn mower"]
SELECTION SCREEN 1 - Option 2: [e.g., "storage solutions"]
[Continue for all options]
```

**Location/Zipcode Mapping (Optional):**
```
If using zipcode collection, provide city mappings:
Zipcode Range 1: [e.g., 60601-60615] → City: [Chicago]
Zipcode Range 2: [e.g., 10001-10003] → City: [New York]
[Add more as needed]
```

---

## 🚀 COMPLETE PROMPT FOR AI

**Copy and paste the template below, filling in your brand details from above:**

---

### THE PROMPT:

I'm building a mobile app onboarding experience for **[BRAND NAME]** that incorporates the **"[BRAND TAGLINE/CONCEPT]"** at every turn.

**Brand Identity:**
- Primary Color: **[PRIMARY COLOR HEX]**
- Secondary Color: **[SECONDARY COLOR HEX]**
- Accent Color: **[ACCENT COLOR HEX]**
- Font: **[FONT FAMILY]**
- Logo: **[LOGO URL]**
- Hero Image: **[HERO IMAGE URL]**

**Onboarding Flow Requirements:**

The app should have an **8-screen onboarding flow** with a personalized home screen:

### Screen 1: Welcome Screen
- Display brand logo prominently
- Show brand tagline: **"[BRAND TAGLINE]"**
- Include compelling hero image: **[HERO IMAGE URL]**
- "Get Started" button in brand color **[PRIMARY COLOR HEX]**
- Clean, modern mobile design

### Screen 2: Account Creation
- Collect the following:
  - **[List account fields: Username, Password, First Name, etc.]**
- Use brand color **[PRIMARY COLOR HEX]** for buttons
- Include password visibility toggle
- "Continue" button

### Screen 3: Personal Information
- Collect:
  - **[List personal info fields: Birthday, Zipcode, Phone, etc.]**
- **[If collecting birthday]**: Birthday input with date picker
- **[If collecting zipcode]**: Zipcode for location-based features
- "Continue" button in brand color

### Screen 4: **[SELECTION SCREEN 1 TITLE]**
- Title: **"[SELECTION SCREEN 1 TITLE]"**
- Subtitle: **"[SELECTION SCREEN 1 SUBTITLE]"**
- **[Selection Type]**: Single select or Multiple selections
- Display **[NUMBER]** options in a grid layout:
  **[List all options from Selection Screen 1 with their icons]**
  1. [Option 1] - Icon: [Icon name]
  2. [Option 2] - Icon: [Icon name]
  3. [Option 3] - Icon: [Icon name]
  4. [Option 4] - Icon: [Icon name]
  [etc.]
- Selected items should highlight with brand color **[PRIMARY COLOR HEX]**
- Show selection count if multiple selections allowed
- "Continue" button

### Screen 5: **[SELECTION SCREEN 2 TITLE]**
- Title: **"[SELECTION SCREEN 2 TITLE]"**
- Subtitle: **"[SELECTION SCREEN 2 SUBTITLE]"**
- **[Selection Type]**: Single select or Multiple selections
- Display **[NUMBER]** options in a grid layout:
  **[List all options from Selection Screen 2 with their icons]**
  1. [Option 1] - Icon: [Icon name]
  2. [Option 2] - Icon: [Icon name]
  3. [Option 3] - Icon: [Icon name]
  [etc.]
- Selected items should highlight with brand color **[PRIMARY COLOR HEX]**
- Show selection count if multiple selections allowed
- "Continue" button

### Screen 6: **[SELECTION SCREEN 3 TITLE]**
- Title: **"[SELECTION SCREEN 3 TITLE]"**
- Subtitle: **"[SELECTION SCREEN 3 SUBTITLE]"**
- **[Selection Type]**: Single select or Multiple selections
- Display **[NUMBER]** options in a grid layout:
  **[List all options from Selection Screen 3 with their icons]**
  1. [Option 1] - Icon: [Icon name]
  2. [Option 2] - Icon: [Icon name]
  3. [Option 3] - Icon: [Icon name]
  [etc.]
- Selected items should highlight with brand color **[PRIMARY COLOR HEX]**
- Show selection count if multiple selections allowed
- "Continue" button

### Screen 7: Loading/Transition Screen
- Show "Creating your personalized experience..." message
- Brand-colored loading animation
- Transition automatically to home screen after 2-3 seconds

### Screen 8: Personalized Home Screen

**Header Section:**
- Hero image background: **[HERO IMAGE URL]**
- Height: 360px with gradient overlay (dark to darker gradient for text readability)
- Brand logo centered at top (80x80px)
- **[If using locations]**: Location selector showing nearest **[LOCATION NAME]** with operating hours
- Animated search bar with typing effect:
  - Search placeholder should TYPE OUT and DELETE based on user selections
  - Typing speed: 150ms per character
  - Deleting speed: 50ms per character  
  - Pause for 2 seconds when fully typed before deleting
  - Cycle through suggestions from all user selections
- Search bar should include:
  - Search icon on left
  - Barcode scanner button
  - Camera button
- Personalized greeting: "Hey, **[First Name]**! 👋"
- **[If collecting zipcode]**: Weather display showing temperature and city name based on zipcode
- Subtext: "Ready to tackle your **[projects/goals/activities]**?"

**Location Card:**
- Display nearest **[LOCATION NAME]** based on zipcode
- Show hours of operation: **[DEFAULT HOURS]**
- Include address
- Use brand color **[PRIMARY COLOR HEX]** for icon
- "View Details" arrow

**Content Sections (Repeat for each selection category):**

For each user selection, create a personalized product/content section:

**Section Template:**
- Section Title: "[Personalized message based on selection]"
- "See All" link in brand color
- Horizontal scrollable product grid
- **ALWAYS show exactly 2 products per category**
- Product cards include:
  - Product image (use Unsplash or provided URLs)
  - Product name (2 lines max)
  - Price in bold
  - Optional discount badge in brand color

**Product Mappings:**
```
[Paste your complete product mappings from the configuration section above]
```

**Search Placeholder Mappings:**
```
[Paste your search term mappings from the configuration section above]
```

**Promotional Banners:**
- Insert 4 promotional banners between content sections:
  - Banner 1 URL: **[BANNER 1 URL]**
  - Banner 2 URL: **[BANNER 2 URL]**
  - Banner 3 URL: **[BANNER 3 URL]**
  - Banner 4 URL: **[BANNER 4 URL]**
- Each banner should be full width, rounded corners, with shadow

**Bottom Navigation:**
- Fixed bottom navigation bar with 4 tabs:
  - Home (active - brand color **[PRIMARY COLOR HEX]**)
  - **[LOCATION NAME]**s (gray)
  - Cart (gray)
  - Account (gray)
- Icons from lucide-react
- Active tab uses brand color

**Additional Requirements:**
- Mobile-first responsive design (375px width optimized)
- Use Tailwind CSS for styling
- All screens use brand color **[PRIMARY COLOR HEX]** for primary actions
- Smooth transitions between screens
- Form validation on all input fields
- Loading states where appropriate
- Use lucide-react for all icons
- **[If using zipcode]**: Mock weather API with city name display (not zipcode)
- **[If using locations]**: Mock location finder based on zipcode
- Ensure ALL product grids show exactly 2 products
- Typing animation in search bar should feel realistic (type, pause, delete, repeat)
- Hero section should show enough background image under the greeting text

**Navigation Flow:**
- Start on Welcome Screen (Screen 1)
- Progress through all 8 screens in order
- Use "Continue" button to advance
- Loading screen (Screen 7) auto-advances to Home Screen (Screen 8)
- Final Home Screen includes bottom navigation

**Technical Stack:**
- React with TypeScript
- Tailwind CSS v4
- lucide-react for icons
- Mobile-optimized (375px viewport)
- Smooth animations and transitions

Please create this complete mobile onboarding experience as a production-ready application with all screens functional and data flowing from onboarding selections to the personalized home screen.

---

## 📝 USAGE INSTRUCTIONS

### Step 1: Fill Out Brand Configuration
Complete all fields in the "BRAND CONFIGURATION" section at the top of this document with your specific brand details.

### Step 2: Customize Selection Screens
Define your 3 selection screens with titles, options, and icons that make sense for your brand/industry.

### Step 3: Map Products/Content
For every selection option, provide at least 2 products or content items that will be recommended to users who select that option.

### Step 4: Map Search Placeholders
For every selection option, provide a search term that represents what users might search for related to that option.

### Step 5: Prepare Assets
Ensure all image URLs (logo, hero, banners, products) are accessible and working.

### Step 6: Copy & Customize The Prompt
Fill in all the **[BRACKETED PLACEHOLDERS]** in "THE PROMPT" section with your brand details from the configuration.

### Step 7: Submit to AI
Copy the completed prompt and submit it to your AI coding assistant (like Claude, GPT, etc.) to generate your branded onboarding experience.

### Step 8: Review & Refine
Once generated, review the experience and make any necessary refinements to match your exact brand guidelines.

---

## 💡 INDUSTRY-SPECIFIC EXAMPLES

### Fitness/Gym Brand
**Selection Screen 1**: "What's your fitness level?" (Beginner, Intermediate, Advanced, Expert)
**Selection Screen 2**: "What are your fitness goals?" (Weight Loss, Muscle Gain, Endurance, Flexibility)
**Selection Screen 3**: "What equipment do you prefer?" (Free Weights, Machines, Cardio, Bodyweight)

### Restaurant/Food Delivery Brand
**Selection Screen 1**: "What's your dining preference?" (Dine-in, Takeout, Delivery, Catering)
**Selection Screen 2**: "What cuisines do you love?" (Italian, Mexican, Asian, American, Mediterranean)
**Selection Screen 3**: "What are your dietary needs?" (Vegetarian, Vegan, Gluten-Free, Keto, No Restrictions)

### Fashion/Retail Brand
**Selection Screen 1**: "What's your style?" (Casual, Formal, Athleisure, Streetwear)
**Selection Screen 2**: "What are you shopping for?" (Tops, Bottoms, Shoes, Accessories, Outerwear)
**Selection Screen 3**: "What's your preferred fit?" (Slim, Regular, Relaxed, Oversized)

### Education/Learning Platform
**Selection Screen 1**: "What's your current level?" (Beginner, Intermediate, Advanced, Expert)
**Selection Screen 2**: "What do you want to learn?" (Programming, Design, Business, Marketing, Languages)
**Selection Screen 3**: "How do you prefer to learn?" (Video, Reading, Interactive, Live Classes)

### Real Estate Brand
**Selection Screen 1**: "What are you looking for?" (Buy, Rent, Sell, Invest)
**Selection Screen 2**: "What type of property?" (House, Apartment, Condo, Townhouse, Land)
**Selection Screen 3**: "What features matter most?" (Location, Price, Size, Amenities, School District)

---

## ✅ QUALITY CHECKLIST

Before finalizing, ensure:

- [ ] All brand colors are consistently applied
- [ ] Logo displays correctly on all screens
- [ ] All selection options have corresponding product mappings (min 2 products each)
- [ ] Search placeholders cover all selection options
- [ ] Promotional banners load correctly
- [ ] Typing animation in search bar works smoothly
- [ ] Weather and location features work (if applicable)
- [ ] All product grids show exactly 2 products
- [ ] Hero section shows adequate background image
- [ ] Bottom navigation highlights active tab correctly
- [ ] Form validation works on all input fields
- [ ] Mobile responsiveness is perfect (375px viewport)
- [ ] All transitions and animations are smooth
- [ ] Data flows correctly from onboarding to home screen

---

## 🎯 SUCCESS CRITERIA

Your onboarding experience is successful when:

1. **Brand Consistency**: Every screen reflects your brand identity (colors, fonts, logo)
2. **Personalization**: Home screen dynamically adjusts based on user selections
3. **User Experience**: Flow is intuitive, smooth, and engaging
4. **Visual Appeal**: Professional design with proper spacing, imagery, and hierarchy
5. **Functionality**: All features work as expected (search animation, location, weather, navigation)
6. **Mobile-Optimized**: Perfect display and interaction on mobile devices
7. **Production-Ready**: Code is clean, organized, and ready for deployment

---

**Version**: 1.0  
**Last Updated**: February 3, 2026  
**Created For**: Generic Mobile Onboarding Experience Template  
**Based On**: Home Depot DO-ER Onboarding Flow
