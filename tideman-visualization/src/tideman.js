// Paso 1: Contar votos y generar la matriz de preferencias
export function tallyVotes(candidates, ballots) {
    console.log(ballots)
    let candidateCount = candidates.length;
    let preferences = Array.from({ length: candidateCount }, () => Array(candidateCount).fill(0));

    // Cada boleta tiene un ranking de candidatos
    for (let ballot of ballots) {
        for (let i = 0; i < ballot.length; i++) {
            for (let j = i + 1; j < ballot.length; j++) {
                let winnerIdx = ballot[i];
                let loserIdx = ballot[j];
                preferences[winnerIdx][loserIdx]++; // Incrementar la preferencia del ganador sobre el perdedor
            }
        }
    }
    return preferences;
}

// Paso 2: Crear las parejas de candidatos según la diferencia de votos
export function createPairs(preferences, candidates) {
    let pairs = [];
    let candidateCount = candidates.length;

    // Crear las parejas de candidatos y calcular su "fuerza" de victoria
    for (let i = 0; i < candidateCount; i++) {
        for (let j = 0; j < candidateCount; j++) {
            if (preferences[i][j] > preferences[j][i]) {
                pairs.push({
                    winner: i,
                    loser: j,
                    strength: preferences[i][j] - preferences[j][i]
                });
            }
        }
    }
    return pairs;
}

// Paso 3: Ordenar las parejas por la fuerza de la victoria (de mayor a menor)
export function sortPairs(pairs) {
    // Ordenar las parejas por fuerza de victoria (en orden descendente)
    pairs.sort((a, b) => b.strength - a.strength);
    return pairs;
}

// Paso 4: Verificar si agregar una arista al grafo crearía un ciclo
export function createsCycle(graph, winner, loser, visited = new Set()) {
    if (winner === loser) return true; // Si se llega al mismo nodo, hay un ciclo

    visited.add(loser);
    for (let next of graph[loser]) {
        if (!visited.has(next) && createsCycle(graph, winner, next, visited)) {
            return true;
        }
    }
    return false;
}

// Paso 5: Bloquear las parejas sin generar ciclos
export function lockPairs(pairs, candidates) {
    let candidateCount = candidates.length;
    let graph = Array.from({ length: candidateCount }, () => new Set());

    // Bloquear las parejas sin generar ciclos
    for (let pair of pairs) {
        if (!createsCycle(graph, pair.winner, pair.loser)) {
            graph[pair.winner].add(pair.loser);
        }
    }
    return graph;
}

// Paso 6: Determinar el ganador del grafo final
export function findWinner(graph, candidates) {
    let candidateCount = candidates.length;
    let hasIncomingEdge = Array(candidateCount).fill(false);

    // Revisar si algún candidato tiene aristas entrantes
    for (let from = 0; from < candidateCount; from++) {
        for (let to of graph[from]) {
            hasIncomingEdge[to] = true;
        }
    }

    // El ganador será el candidato sin aristas entrantes
    for (let i = 0; i < candidateCount; i++) {
        if (!hasIncomingEdge[i]) {
            return candidates[i]; // Devolver el nombre del ganador
        }
    }
    return null;
}

// Ejemplo de uso
let candidates = ["Alice", "Bob", "Charlie"]; // Lista de candidatos solo con nombres
let ballots = [
    [0, 1, 2], // Votante 1 prefiere Alice > Bob > Charlie
    [0, 2, 1], // Votante 2 prefiere Alice > Charlie > Bob
    [1, 2, 0], // Votante 3 prefiere Bob > Charlie > Alice
    [2, 0, 1]  // Votante 4 prefiere Charlie > Alice > Bob
];

// Proceso completo
let preferences = tallyVotes(candidates, ballots);
let pairs = createPairs(preferences, candidates);
let sortedPairs = sortPairs(pairs);
let lockedGraph = lockPairs(sortedPairs, candidates);
let winner = findWinner(lockedGraph, candidates);

console.log("Winner:", winner);
