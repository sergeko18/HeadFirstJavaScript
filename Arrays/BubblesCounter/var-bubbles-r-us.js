function bubblesSolutionScores(scores) {
    /* let i = 0;
     while (i < scores.length) {
         let output = "Bubble solutions #" + i + "score:" + scores[i] + "<br>";
         document.write(output);
         i = i + 1;
     }*/
    let highScores = 0;
    let output;
    for (let i = 0; i < scores.length; i++) {
        output = "Bubble solutions #" + i + "score:" + scores[i] + "<br>";
        document.write(output);
        if (scores[i] > highScores) {
            highScores = scores[i];
        }
    }
    return highScores;


}

function getBestResults(scores, highScores) {
    let bestSolutions = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] == highScores) {
            bestSolutions.push(i);
        }

    }
    return bestSolutions;

}

function getMostCostEffectiveSolution(scores, costs, highScores) {
    let cost = 100;
    let index;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] == highScores) {
            if (cost > costs[i]) {
                index = i;
                cost = costs[i]
            }
        }
    }
    return index;
}





