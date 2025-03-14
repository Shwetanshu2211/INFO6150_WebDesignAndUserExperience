# TechInfo - Best Smartphones

## Overview

TechInfo is a platform showcasing the latest and best smartphones, allowing users to browse top-rated devices, compare prices, and find their ideal smartphone.

## SASS/SCSS Features Implemented

This project utilizes SASS (Syntactically Awesome Stylesheets) to enhance styling and maintainability. Below are the key SCSS features implemented:

### 1. **Variables**

- Centralized storage for colors, fonts, and border-radius values ensures consistency across the project.
- Example variables used: `$primary-color`, `$secondary-color`, `$font-family`, and `$border-radius`.

### 2. **Mixins**

- Reusable mixins help in applying consistent styles, such as button styling, across multiple elements.
- The `@mixin button-style($bg-color)` is used to define button styles with dynamic background colors.

### 3. **Extends and Placeholders**

- Shared styles are managed efficiently using placeholders (`%button-style`) to prevent redundancy.
- The placeholder `%button-style` is used for button components.

### 4. **Nesting**

- SCSS nesting improves code organization, making it easier to read and maintain.
- Example: `.phone-card img { max-width: 100%; }` inside `.phone-card` for a structured hierarchy.

### 5. **Media Queries**

- Responsive design is handled through SCSS media queries, ensuring adaptability across different screen sizes.
- The `.index-container` and `.about-content` sections use `@media(min-width: 768px)` and `@media(min-width: 1024px)` for responsive layouts.

### 6. **CSS Grid and Flexbox**

- The layout is structured using CSS Grid (`grid-template-columns`) and Flexbox (`display: flex`) for better alignment and responsiveness.
- Example: `.about-container` and `.index-container` leverage these techniques.

### 7. **CSS Custom Properties**

- Uses `:root` variables like `--main-bg-color` and `--main-font-family` to maintain a consistent theme.
- SCSS variables and CSS custom properties are combined for flexibility.

### 8. **Maps and Loops**

- Maps store multiple colors in `$colors` and are accessed using `map-get($colors, primary)`.
- The `@for` loop generates `.item-#{$i}` classes dynamically to scale element sizes.

### 9. **String Interpolation**

- Used for dynamic class generation, such as `.button-#{'color-' + $color}`.
- Ensures scalable and reusable styles.

## Setup and Running the Project

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- SASS compiler

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Shwetanshu2211/INFO6150_WebDesignAndUserExperience.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Assignment 7
   ```
3. Install dependencies (if using a package manager like npm):
   ```bash
   npm install
   ```

### Compiling SCSS to CSS

Run the following command to compile SCSS files:

```bash
sass --watch scss:css
```

This watches for any changes in SCSS files and automatically compiles them into CSS.

### Running the Project

1. Open the `index.html` file in a browser.
2. Ensure styles are applied correctly.

## File Structure

```
project-root/
│── index.html
│── css/
│   ├── main.css
│── scss/
│   ├── main.scss
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│── images/
│── README.md
```
