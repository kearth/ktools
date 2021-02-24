package ut

import (
	"fmt"
	"strings"
)

type FuncFlow struct {
	Fields   []string
	FuncList []TestFunc
	Index    int
	Next     func() bool
}

func InitFlow(a *AutoCreateUT) *FuncFlow {
	flow := new(FuncFlow)
	flow.Fields = a.OriFields
	flow.Next = flow.Start
	flow.Index = -1
	return flow
}

func (f *FuncFlow) Start() bool {
	tf := new(TestFunc)
	f.FuncList = append(f.FuncList, *tf)
	f.Index = f.Index + 1
	if f.Fields[0] == "func" && len(f.Fields) >= 2 {
		if IsClassMethod(f.Fields[1]) {
			f.Next = f.SetClass
			f.Fields = f.Fields[2:]
		} else {
			f.Next = f.SetName
			f.Fields = f.Fields[1:]
		}
		return false
	}
	panic("flow Start error :" + f.Fields[0])
}

func (f *FuncFlow) SetClass() bool {
	if len(f.Fields) >= 2 {
		f.FuncList[f.Index].Class = GetClassName(f.Fields[0])
		f.Fields = f.Fields[1:]
		f.Next = f.SetName
		return false
	}
	panic("flow SetClass error :" + f.Fields[0])
}

func (f *FuncFlow) SetName() bool {
	if len(f.Fields) >= 2 {
		f.FuncList[f.Index].FuncName = GetFuncName(f.Fields[0])
		f.Fields = f.Fields[1:]
		f.Next = f.SetInput
		return false
	}
	panic("flow SetName error :" + f.Fields[0])
}
func (f *FuncFlow) SetInput() bool {
	var i int
	f.FuncList[f.Index].Input, i = GetInput(f.Fields)
	if (i + 1) == len(f.Fields) {
		panic("flow SetInput error :" + f.Fields[0])
	}
	f.Fields = f.Fields[i:]
	f.Next = f.SetOutput
	return false
}
func (f *FuncFlow) SetOutput() bool {
	var i int
	f.FuncList[f.Index].Output, i = GetOutput(f.Fields)
	if (i + 1) == len(f.Fields) {
		panic("flow SetOutput error :" + f.Fields[0])
	}
	f.Fields = f.Fields[i:]
	f.Next = f.End
	return false
}

func (f *FuncFlow) End() bool {
	var index int
	braceCnt := 0
	for i, v := range f.Fields {
		index = i + 1
		if strings.Contains(v, "{") {
			braceCnt = braceCnt + 1
		}
		if strings.Contains(v, "}") {
			braceCnt = braceCnt - 1
		}
		if braceCnt == 0 {
			break
		}
	}
	f.Fields = f.Fields[index:]
	if len(f.Fields) == 0 {
		f.Next = f.Exit
	} else {
		f.Next = f.Start
	}
	return false
}

func (f *FuncFlow) Exit() bool {
	fmt.Printf("%v\n", f)
	return true
}
