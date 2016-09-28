function randArrayMaker(trace,length,volatility,constant) {
  data = [trace]
  for ( i = 0; i < length; i++ ) {
       var randNum = 0;
       var randNum = (Math.random() * volatility) + constant;
        data.push(randNum)
  }
  return data
}

$( document ).ready(function() {
  var chart = c3.generate({
    bindto: '#chart',
      data: {
          xs: {
              'data1': 'x1',
              'data2': 'x2',
              'data3': 'x3',
          },
          columns: [
              randArrayMaker('x1',5000,10,10),
              randArrayMaker('x2',5000,10,10),
              randArrayMaker('x3',5000,10,10),
              randArrayMaker('data1',5000,10,10),
              randArrayMaker('data2',5000,10,10),
              randArrayMaker('data3',5000,10,10),
          ]
      },
      subchart: {
          show: true
      },
      axis: {
        x: {
            tick: {
                culling: {
                    max: 2 // the number of tick texts will be adjusted to less than this value
                }
            }
        }
    }
  });
});
