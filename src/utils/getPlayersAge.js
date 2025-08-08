export const getPlayersAge = (birthDate) => {
  const today = new Date();
  const playersBirthDate = new Date(birthDate);

  let age = today.getFullYear() - playersBirthDate.getFullYear();

  const ifBeforeBirthdayThisYear =
    today.getMonth() < playersBirthDate.getMonth() ||
    (today.getMonth === playersBirthDate.getMonth &&
      today.getDate() < playersBirthDate.getDate());

  if (ifBeforeBirthdayThisYear) {
    age--;
  }

  return age;
};
