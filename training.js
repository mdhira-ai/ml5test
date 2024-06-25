

let l = document.getElementById('input')
export let status = document.getElementById('result');

export function train() {
    let classifier;

    // const data = [
    //     { input: 10, output: 0 },  // 10°C, does not like ice cream                  //for regression
    //     { input: 20, output: 0 },  // 20°C, does not like ice cream
    //     { input: 30, output: 1 },  // 30°C, likes ice cream
    //     { input: 40, output: 1 },  // 40°C, likes ice cream
    // ];



    const data = [
        { input: 10, output: 'No ice cream' },  // 10°C, does not like ice cream
        { input: 20, output: 'No ice cream' },  // 20°C, does not like ice cream
        { input: 30, output: 'ice cream' },  // 30°C, likes ice cream
        { input: 40, output: 'ice cream' },  // 40°C, likes ice cream
    ];




    ml5.setBackend("webgl");

    let options = {
        task: "classification",                                 //change to regression


    };
    classifier = ml5.neuralNetwork(options);



    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let inputs = [item.input];
        let outputs = [item.output];
        classifier.addData(inputs, outputs);
    }

    classifier.normalizeData();

    const trainingOptions = {
        epochs: 100,
        batchSize: 12,
    };

    classifier.train(trainingOptions, (epoch, loss) => {
        // console.log(`Epoch: ${epoch}, Loss: ${loss.loss.toFixed(4)}`);

        status.innerHTML = `Epoch: ${epoch}, Loss: ${loss.loss.toFixed(4)}`
    }, finishedTraining);

    function finishedTraining() {
        classify();  // Pass the input 'i' to classify after training
    }

    function classify() {
        let input = [parseInt(l.value)];
        // console.log(input)
        classifier.classify(input, handleResults);                                              //for regression change classify to predict
    }

    function handleResults(results, error) {
        if (error) {
            console.error(error);
            return;
        }
        let d = results[0].label;

        status.innerHTML = d

    }
}
