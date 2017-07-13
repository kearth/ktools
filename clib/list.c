typedef struct node{
    //下一个结点
    struct node *next;
    //结点的值
    int value;
} Node;

typedef struct list{
    //链表的首结点
    Node *head;
    //链表长度
    int count;
} List;

List * CreateList();
Node * CreateNode(int v);
Status InsertList(List *l, Node *n);
Status RemoveList(List *l, Node *n);
Status IsExistInList(List *l, Node *n);
void DisplayList(List *l);
List * GetList(int v[],int length);

List * CreateList(){
    List *l = (List*)malloc(sizeof(List));
    l->head = NULL;
    l->count = 0;
    return l;
};

Node * CreateNode(int v){
    Node *n = (Node*)malloc(sizeof(Node));
    n->next = NULL;
    n->value = v;
    return n;
}

Status InsertList(List *l, Node *n){
    //如果存在不允许插入
    if(IsExistInList(l,n)) return False;
    Node *tmp = l->head;
    if(NULL == tmp){
        l->head = n;
    }else{
        while(tmp->next){
            tmp = tmp->next;
        }
        tmp->next = n;
    }
    l->count++;
    return Success;
}

Status RemoveList(List *l, Node *n){
    if(!IsExistInList(l,n))return False;
    Node *tmp = l->head;
    Node *last = l->head;
    if(NULL != tmp){
        while(tmp){
            if(n->value == tmp->value){
                if(last->value == l->head->value){
                    l->head = tmp->next;
                } else {
                    last->next = tmp->next;
                }
                l->count--;
                return Success;
            }
            last = tmp;
            tmp = tmp->next;   
        }
    }
    return False;
}

Status IsExistInList(List *l, Node *n){
    Node *tmp = l->head;
    while(tmp){
        if(n->value == tmp->value)return Success;
        tmp = tmp->next;
    }
    return False;
}

void DisplayList(List *l){
    Node *tmp = l->head;
    while(tmp){
        print("%d",tmp->value);
        if(tmp->next){
            printf(",");
        }
        tmp = tmp->next;
    }
    printf("\n");
}


List * GetList(int v[],int length){
    List *l = CreateList();
    for(int i=0;i<length;i++){
        InsertList(l,CreateNode(v[i]));
    }
    return l;
}
