import random

def generate_source_matrix(n,m):
    return [[1]*m for i in range(n)]

##здесь система координат транспонирована:
##x - номер строки (т.е. фактически ордината)
##y - номер столбца (т.е. фактически абсцисса)
def find_way(x1,y1,x2,y2,matrix):
    euclidis = euclidis_metric(x2,y2)
##    print(x1, y1, x2, y2)
##    print(euclidis((x1,y1)))
    n = len(matrix)
    m = len(matrix[0])
    visited = []
    while True:
##        print(x1,y1)
        matrix[x1][y1] = 0
##        for i in matrix:
##            print(i)
        neighbours = find_neighbours(x1,y1,n,m)
        ##перейти к соседу, наиболее близкому к X2, y2:
        neighbours = sorted(neighbours,key=euclidis)
        completed = False
        for i in neighbours:
            if i not in visited:
                completed = True
                x1 = i[0]
                y1 = i[1]
                visited.append(i)
                break
        if (x1==x2 and y1==y2) or not completed:
            matrix[x1][y1] = 0
            break
    return matrix

def find_neighbours(x1,y1,n,m):
    output = []
    input_coords = (x1,y1)
    add_coords = ((-1,0),(0,-1),(0,1),(1,0))
    for add_coord in add_coords:
        x,y = sum_coords(input_coords,add_coord)
        if -1<x<n and -1<y<m:
            output.append((x,y))
    return output

def sum_coords(coord1, coord2):
    return coord1[0]+coord2[0], coord1[1]+coord2[1]

def euclidis_metric(x2,y2):
    t = lambda p: ((p[0]-x2)**2 + (p[1]-y2)**2) ** 0.5
    return t

##def minind(l):
##    min_ind = 0
##    for i in range(len(l)):
##        if l[i]<l[min_ind]:
##            min_ind = i
##    return min_ind

def generate_dungeon(a,b):
    '''a>6, b>6'''
    a, b = b, a
    m = generate_source_matrix(a,b)
    #соединим между собой несколько точек
    #внутри прямоугольника и несколько точек на его гранях
    #для того, чтобы сгенерировать подземелье
##    1. соединим произвольную точку p у левого края нижней грани
##    с произвольной точкой p1 у правого края верхней грани или
##    с произвольной точкой верхнего края правой грани
##    2. соединим  точку p c произвольной точкой p2 левого края верхней грани
##    или с произвольой точкой верхнего края левой грани
##    3. соединим точку p c 2-4 Точками внутри прямоугольника
    x_p = a-1
    y_p = random.randint(0,2)
    x_P, y_P = get_p1_coords(a,b)
    m = find_way(x_p,y_p,x_P,y_P,m)
    x_P, y_P = get_p2_coords(a,b)
    m = find_way(x_p,y_p,x_P,y_P,m)
    n_inner_points = random.randint(2*(a+b)//6,4*(a+b)//3)
    for i in range(n_inner_points):
        x_P = random.randint(1,a-2)
        y_P = random.randint(1,b-2)
        m = find_way(x_p,y_p,x_P,y_P,m)
    return m

def get_p1_coords(a,b):
    c = random.choice((True,False))
    if c:
        a = 0
        b = b - random.randint(0,3)
    else:
        a = random.randint(0,3)
        b = b-1
    return a,b

def get_p2_coords(a,b):
    c = random.choice((True,False))
    if c:
        a = 0
        b = random.randint(0,3)
    else:
        a = random.randint(0,3)
        b = 0
    return a,b

if __name__ == '__main__':
    m = generate_dungeon(16,9)
    for i in m:
        print(i)
