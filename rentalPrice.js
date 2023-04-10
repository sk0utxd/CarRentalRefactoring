function calculateRentalPrice(age, licenseYears, carClass, hasRecentAccident, hasParticipatedInAccident, isHighSeason) {
  const MINIMUM_DRIVING_AGE = 18;
  const MAX_CLASS_FOR_YOUNG_DRIVERS = 1;
  const MAX_AGE_FOR_CLASS_1_VEHICLES = 21;
  const MAX_AGE_FOR_DISCOUNTED_PRICE = 25;
  const DISCOUNTED_PRICE_MULTIPLIER = 1.3;
  const RECENT_ACCIDENT_SURCHARGE = 15;
  const MAX_RENTAL_PRICE = 1000;

  if (age < MINIMUM_DRIVING_AGE) {
      return "Driver too young - cannot quote the price";
  }

  if (age <= MAX_AGE_FOR_CLASS_1_VEHICLES && carClass > MAX_CLASS_FOR_YOUNG_DRIVERS) {
      return "Drivers 21 y/o or less can only rent Class 1 vehicles";
  }

  let rentalPrice = age;

  if (carClass >= 4 && age <= MAX_AGE_FOR_DISCOUNTED_PRICE && isHighSeason) {
      rentalPrice *= 2;
  }

  if (licenseYears < 1) {
      return "Driver must hold driving licence at least for one year. Can not rent a car!";
  }

  if (licenseYears < 3) {
      rentalPrice *= DISCOUNTED_PRICE_MULTIPLIER;
  }

  if (hasRecentAccident && age < 30) {
      rentalPrice += RECENT_ACCIDENT_SURCHARGE;
  }

  if (rentalPrice > MAX_RENTAL_PRICE) {
      return MAX_RENTAL_PRICE;
  }

  return rentalPrice;
}

exports.calculateRentalPrice = calculateRentalPrice;