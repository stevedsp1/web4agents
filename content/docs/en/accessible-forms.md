---
title: "Accessible Forms"
slug: "accessible-forms"
description: "How to build forms that AI agents and automated tools can understand and interact with."
category: "content-markup"
order: 5
publishedAt: "2025-02-15"
status: "published"
---

Forms are the primary way users — and AI agents — take action on your site: submitting requests, signing up, purchasing, contacting you. An accessible, well-labeled form is also a machine-readable form.

## The foundation: `<label>` elements

Every input must have a visible, associated `<label>`:

```html
<!-- Bad: no label -->
<input type="email" placeholder="Email" />

<!-- Bad: label not associated -->
<label>Email</label>
<input type="email" />

<!-- Good: label associated via for/id -->
<label for="email">Email address</label>
<input type="email" id="email" name="email" />

<!-- Good: label wrapping the input -->
<label>
  Email address
  <input type="email" name="email" />
</label>
```

AI form-filling agents (like browser-use or Playwright-based bots) rely on label text to identify which field to fill. Missing or incorrect labels cause agents to skip or misidentify fields.

## Use the right input type

HTML5 input types provide semantic meaning and validation:

```html
<input type="email" />      <!-- Email address -->
<input type="tel" />        <!-- Phone number -->
<input type="url" />        <!-- URL -->
<input type="number" />     <!-- Numeric value -->
<input type="date" />       <!-- Date picker -->
<input type="search" />     <!-- Search field -->
<input type="password" />   <!-- Password (hidden) -->
<input type="checkbox" />   <!-- Boolean checkbox -->
<input type="radio" />      <!-- Single choice from a group -->
```

Using the right type tells agents what kind of data the field expects — no guessing required.

## Grouping related fields

Use `<fieldset>` and `<legend>` for groups of related inputs:

```html
<fieldset>
  <legend>Contact preference</legend>
  <label>
    <input type="radio" name="contact" value="email" /> Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone" /> Phone
  </label>
</fieldset>
```

This tells agents that these options are related and mutually exclusive.

## Descriptive submit buttons

The submit button text tells agents (and users) what the form does:

```html
<!-- Bad -->
<button type="submit">Submit</button>

<!-- Good: describes the action -->
<button type="submit">Send message</button>
<button type="submit">Subscribe to newsletter</button>
<button type="submit">Request a free audit</button>
```

## Error messages

Error messages must be programmatically associated with the field that caused the error:

```html
<label for="email">Email address</label>
<input
  type="email"
  id="email"
  name="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<p id="email-error" role="alert">
  Please enter a valid email address.
</p>
```

- `aria-describedby` links the error message to the field.
- `aria-invalid="true"` signals that the field value is invalid.
- `role="alert"` announces the error immediately to assistive technologies.

## Autocomplete attributes

`autocomplete` attributes help browser autofill and AI form-filling agents:

```html
<input type="text" name="name" autocomplete="name" />
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="phone" autocomplete="tel" />
<input type="text" name="company" autocomplete="organization" />
<input type="text" name="address" autocomplete="street-address" />
```

## Placeholders are not labels

Placeholders disappear when the user starts typing. They are hints, not labels. Always provide a visible `<label>`:

```html
<!-- Acceptable: placeholder as hint, label as label -->
<label for="email">Email address</label>
<input type="email" id="email" placeholder="you@example.com" />
```

## Required fields

Use the `required` attribute and mark required fields visually:

```html
<label for="email">
  Email address <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="email" id="email" required />
```

## Complete example

```html
<form action="/contact" method="POST">
  <div>
    <label for="name">Full name</label>
    <input type="text" id="name" name="name" autocomplete="name" required />
  </div>

  <div>
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" autocomplete="email" required />
  </div>

  <div>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <button type="submit">Send message</button>
</form>
```

## Testing

- Disable CSS and check if the form is still understandable.
- Tab through the form with keyboard only — every field should be reachable and clearly labeled.
- Use a screen reader (VoiceOver, NVDA) to verify labels are announced correctly.
- Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) and review the Accessibility audit results.
