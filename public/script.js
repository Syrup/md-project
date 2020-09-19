const db = localStorage

db.setItem('theme', 'dark')


function setDarkMode(isDark) {
  if(isDark) {
    document.body.setAttribute('id', 'darkmode')
  } else {
    document.body.setAttribute('id', '')
    db.delete('theme')
  }
}

const darkmode =  new Darkmode();
if (darkmode.isActivated()) {
document.getElementById("dark-toggle").checked = true;
}
else {
document.getElementById("dark-toggle").checked = false;
}