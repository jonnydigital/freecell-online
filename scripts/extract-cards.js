// Run this in the browser console on AI Studio conversation page
// It extracts all generated card images as downloadable files

(function() {
  var imgs = document.querySelectorAll('img');
  var cards = [];
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.naturalWidth >= 500 && img.src.startsWith('data:image')) {
      cards.push({
        index: cards.length,
        alt: img.alt,
        src: img.src
      });
    }
  }
  
  // Download each
  cards.forEach(function(card, idx) {
    var a = document.createElement('a');
    a.href = card.src;
    a.download = 'card_' + idx + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  
  return cards.length + ' cards found and downloading';
})();
