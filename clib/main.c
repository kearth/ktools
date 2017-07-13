#include "clib.h"
#include "quene.c"
#include "stack.c"
#include "list.c"
#include "tree.c"
#include "heap.c"
#include "graph.c"






Status main(){
    int v1[] = {1,2,3,4};
    int v2[] = {2,11,3,4,5,6};
    int v3[] = {3,24,5,6};
    int v4[] = {4,2,345,6};
    List *l1 = GetList(v1,4);
    List *l2 = GetList(v2,6);
    List *l3 = GetList(v3,4);
    List *l4 = GetList(v4,4);
    List *l[4];
    l[0] = l1;
    l[1] = l2;
    l[2] = l3;
    l[3] = l4;
    CreateGraph(l,4);
    return Success;
}
