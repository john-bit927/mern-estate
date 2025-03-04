import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // ✅ Fix: 'require' → 'required'
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACUCAMAAACp1UvlAAAAMFBMVEXk5ueutLeor7La3d7n6erh4+Tq7O3IzM62u76/xMbV2NqrsbW6v8LS1deyuLvP09RYnE+7AAADeklEQVR4nO2bSXLlIAxADYjJYHP/2zaQ/kncfwBhI1xdvE1SWb0SQmCkLMtkMplMJpPJZDKZTCaTyX8BACwykn+5CwBy1dr6iNVhleoOaiCF3hlzEZZ/MGaCHB01gM1noQOc2XVk0GDZ9iepjHNmHSYGwvOXVtmMWznGDDR7HayHGRsSMmnfB+thpunF5JvMOopZeq2yVRLzxBGrsqKPmKn1imKKzEr5itx6wAPVUkIo7sRDxFYiL4GxStCspKqpEIeAkZQx2FCrmBEEXoi9+B0w2z9gEJCrmOCyu5fCW0W6BwwEPrsie++AgW2KlwudvSrP6yd85xq2NmR9gvdNMNCtXn0PI9W4jL13pGrajYm+F0TZ7NW3UrSmffTqeUY2HUJ/6erVuh073w4bq3322qbX9Cp53TXvb1on7lpXT5xDpus5dNdz+673nOWm98K73qMXif/aTnR/N2ys+Lxntc9eN/2ubdyRBA8nLZnPu1std31nWmBFZ1j/7Eoog1xJTtSOQb6duJ3oBR/5Tk7zuppQFtNX2AhbRPUpxin24jdQ+4ZP3emraj/GaFH3+eqWckTDdin3kakK1xEIn9fS7WLQQID8MKcQgzVoTiGihHmeNsmxYqOmJ76AZfX8KWjc2UFLeFALfo8qKXB5emj32zLcKgEgxaat9dZqvYnhw0w/wIHRNgmlVIzWugX9RdhWIWT86zCjNLgngjW/RtJ+5ZgNa57qI3ZSi9DWM87fVVbnODdWUw71xUAF79jrwvWPHHNGk2wEUELHOCHuhY4b3XuqD+RmPg+jvYnbrmW/mqakNq3vcpz1OgLiKd0Qql9BY/t6fcyUtBWJXgqav/gbBK6wykEzF64mgMaOCn0wu+wCBAL74f9ZjF0zqAb6miX8gfvzIYu78GIrdsXELYjrMutgdu5L6UyfqiDmz2jp5rZLWcw0Jxlgnm3oxPpqpe/eJrHeWjliDVrtLWOEGF6rYRq0QQz7aAeif7SyGLaONfc/sWKo+wXqYfccO2YVVyor5EpeerEpiVU/7/c7FV9iqgNGaZUmd+rEKCrqwav2akFVIx7wugzD9xdP4qqGlJUn1opiNee3JNdiruILCcIAr5rmFt0R9ENFA7xx0OUcFTtyQHql/xUrerXNuZylfD9E9tQvwpQqWPxkHIErVlYxhmJ+TSaTyWQyWf4AUg4vkCe2MvQAAAAASUVORK5CYII="
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
