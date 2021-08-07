INSERT INTO FormInput (title, subtitle, type, createdAt, updatedAt) 
VALUES 
  ("What did you like the most?", "Tell us about your experience", "text", now(), now()), 
  ("What did you like the least?", "Let us know how we can improve", "text", now(), now()), 
  ("Give us your rating", "", "linear_scale", now(), now()), 
  ("Your email", "Your email address", "email", now(), now());