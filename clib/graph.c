#define GRAPH_SIZE 10
typedef struct edge{
    //指向下一个边
    struct edge *next;
    //边连接的顶点
    int vertex;
} Edge;

typedef struct vertex{
    //顶点的第一个边
    Edge *edge_head;
    //边数量
    int edge_count;
    //顶点值
    int vertex_value;
} Vertex;


Edge * CreateEdge(int v);
Vertex * CreateVertex(int val);

Edge * CreateEdge(int v){
    Edge *e = (Edge*)malloc(sizeof(Edge));
    e->next = NULL;
    e->vertex = v;
    return e;
}


Vertex * CreateVertex(int val){
    Vertex *v = (Vertex*)malloc(sizeof(Vertex));
    v->edge_head = NULL;
    v->edge_count = 0;
    v->vertex_value = val;
    return v;
}


void CreateGraph(List *v[],int length){
    Vertex *graph[length];
    for(int i =0; i< length;i++){
        graph[i] = CreateVertex(i);
    }
}
