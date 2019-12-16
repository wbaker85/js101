let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let newThing = Object.values(obj).map((product) => {
  if (product.type === 'fruit') {
    return product.colors.map((color) => color[0].toUpperCase() + color.slice(1));
  }
  return product.size.toUpperCase();
});

console.log(newThing);