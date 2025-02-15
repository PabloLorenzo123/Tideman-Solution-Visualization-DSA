"""
Tic Tac Toe Player
"""

import math
import copy

X = "X"
O = "O"
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]]


def player(board):
    """
    Returns player who has the next turn on a board.
    """

    filled = 0

    for row in board:
        for column in row:
            if column != EMPTY:
                filled += 1

    if filled % 2 == 0:
        return X
    else: 
        return O


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    actions_set = set()

    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] == EMPTY:
                actions_set.add((i, j))

    return actions_set



def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    board = copy.deepcopy(board)

    if action[0] < 0 or action[1] < 0:
        raise Exception("negative out-of-bounds move")

    if board[action[0]][action[1]]:
        raise Exception("action can not be perfomed")
    
    board[action[0]][action[1]] = player(board)

    return board


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """

    length = len(board)

    for player in [X, O]:
        # Check if there are three in a row in a row in any row
        count = 0
        for i in range(length):
            if count == 3:
                return player
            
            count = 0

            for j in range(length):
                if count == 3:
                    return player
                if board[i][j] == player:
                    count += 1
                    continue
                else:
                    count = 0

        # Check if there are three in a row in a column
        for i in range(length):
            if count == 3:
                return player        
            count = 0
            for j in range(length):
                if count == 3:
                    return player
                if board[j][i] == player:
                    count += 1
                    continue
                else:
                    count = 0

        # Check if there are three in a row diagonally on each diagonal
        count = 0
        for i in range(length):
            if board[i][i] == player:
                count += 1
                continue
            else:
                break

        if count == 3:
            return player

        count = 0
        for i in reversed(range(length)):
            if board[i][length - i - 1] == player:
                count += 1
                continue
            else:
                break
        
        if count == 3:
            return player
        
    return None


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    if (winner(board)):
        return True
    
    for row in board:
        for column in row:
            if column == EMPTY:
                return False
            
    return True


def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    if (winner(board) == X):
        return 1
    elif (winner(board) == O):
        return -1
    else:
        return 0


def minimax(board):
    """
    Returns the optimal action for the current player on the board.
    """
    if (terminal(board)):
        return None
    
    # Get current player
    current_player = player(board)

    # Deep copy the board
    board_copy = copy.deepcopy(board)
    results = []
    next_moves = {}

    for action in actions(board_copy):
        if current_player == X:
            min_v = min_value(result(board_copy, action))
            results.append(min_v)
            next_moves[min_v] = action
        else:
            max_v = max_value(result(board_copy, action))
            results.append(max_v)
            next_moves[max_v] = action

    if current_player == X:
        return next_moves[max(results)]
    else:
        return next_moves[min(results)]
    

def min_value(board):
    if terminal(board):
        return utility(board)
    v = math.inf
    for action in actions(board):
        board_result = result(board, action)
        v = min(v, max_value(board_result) - get_board_size(board_result))
    return v


def max_value(board):
    if terminal(board):
        return utility(board)
    v = - (math.inf)
    for action in actions(board):
        board_result = result(board, action)
        v = max(v, min_value(board_result) - get_board_size(board_result))
    return v


def get_board_size(board):
    size = 0
    for row in board:
        for column in row:
            if column != EMPTY:
                size += 1
    return size

