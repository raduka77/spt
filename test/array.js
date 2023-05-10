const p1 = [
  {
    matchSlug: 'zhizhen-zhang-vs-aslan-karatsev',
    internalId: '75813@60502',
    matchName: 'Zhang vs Karatsev',
    matchDate: 1683198000,
  },
  {
    matchSlug: 'jan-lennard-struff-vs-aslan-karatsev',
    internalId: '46391@60502',
    matchName: 'Struff vs Karatsev',
    matchDate: 1683309600,
  },
];

const a = {
  matchSlug: 'jan-lennard-struff-vs-aslan-karatsev',
  internalId: '46391@60502',
  matchName: 'Struff vs Karatsev',
  matchDate: 1683309600,
};

const result = p1.filter(e => e.internalId !== '46391@60502');
console.log('returned');
console.log(result);
result.push(a);
console.log('after adding');
console.log(result);
