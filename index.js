/* 
    PAA - Analise algoritmos de ordenação

    deve implementar os algoritmos e comparar os tempos
    de execução dos algoritmos obtidos no pior caso, 
    melhor caso e um caso aleatório, utilizando um 
    conjunto de dados contendo 50.000, 100.000 e 
    500.000 números gerados. Por isso, deve ser 
    implementada uma função ou método para gerar números 
    aleatórios e uma função ou método para contar o 
    tempo de ordenação dos números.
*/


const gerarArrayDeNumeros = (tipo_de_geracao, quantidade) => 
{
    console.log("Gerando array...")

    let arr = [];

    const piorCaso = () => 
    {
        for(i=quantidade; i>= 0; i--)
            arr.push(i)
    }

    const melhorCaso = () => 
    {
        for(i=0; i<= quantidade; i++)
            arr.push(i)
    }

    const casoAleatorio = () => 
    {
        for(i=0; i<= quantidade; i++)
            arr.push( Math.floor(Math.random() * 1000000))
    }

    switch(tipo_de_geracao)
    {
        case "pior caso": piorCaso(); break;
        case "melhor caso" : melhorCaso(); break;
        case "caso aleatorio": casoAleatorio(); break;
    }

    console.log("geração finalizada...")

    return arr;
}

const buckteSort = (arr) =>
{
    const insertion = (arr) => 
    {
        let length = arr.length;
        let i, j;

        for(i = 1; i < length; i++) 
        {
            let temp = arr[i];

            for(j = i - 1; j >= 0 && arr[j] > temp; j--) 
                arr[j+1] = arr[j];

            arr[j+1] = temp;
        }
        
        return arr;
    };

    if (arr.length === 0)
       return arr;
    
    let i,

    minValue = arr[0],
    maxValue = arr[0],

    bucketSize = 5;

    arr.forEach(currentVal => 
    {
       if (currentVal < minValue) 
          minValue = currentVal;
       else if (currentVal > maxValue) 
          maxValue = currentVal;
    })

    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);

    for (i = 0; i < allBuckets.length; i++) 
       allBuckets[i] = [];
     
    arr.forEach(currentVal=> 
    {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });

    arr.length = 0;

    allBuckets.forEach(function(bucket) 
    {
       insertion(bucket);
       bucket.forEach(element =>
       {
          arr.push(element)
       });
    });

    return arr;
}

const mergeSort = (arr) =>
{
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    const merge = (left, right) => 
    {
        
        while (leftIndex < left.length && rightIndex < right.length) 
        {
            if (left[leftIndex] < right[rightIndex])
            {
                resultArray.push(left[leftIndex]);
                leftIndex++; 
            } 
            else 
            {
                resultArray.push(right[rightIndex]);
                rightIndex++; 
            }
        }
      
        return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    if (arr.length <= 1)
        return arr;

    const middle = Math.floor(arr.length / 2);

    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge( mergeSort(left), mergeSort(right));
    
}

const bubbleSort = (array) =>
{
    var len = array.length;
    
    for (var i = 0; i < len ; i++) 
    {
        for(var j = 0 ; j < len - i - 1; j++)
        {
            if (array[j] > array[j + 1]) 
            {
                var temp = array[j];
                array[j] = array[j+1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}

const startMain = () =>
{
    //console.log(`bubble sort: ${bubbleSort([1,9,2,3,7,6,4,5,5])}`)
    //console.log(`Merge sort: ${mergeSort([10, -1, 2, 5, 0, 6, 4, -5])}`)
    //console.log(`bucket sort: ${buckteSort([10, -1, 2, 5, 0, 6, 4, -5])}`)

    let array = gerarArrayDeNumeros("pior caso", 50000)

    console.log("execuntando função de ordenação...")

    const tempo_inicial = performance.now();
    
    buckteSort(array)

    const tempo_final = performance.now() - tempo_inicial;

    console.log("tempo de execução: " + tempo_final + " millisegundos ou " + ((tempo_final/1000) % 60).toFixed(2) + " segundos")

}

startMain()