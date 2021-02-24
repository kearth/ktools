package ut

type TestFunc struct {
	Class    string
	FuncName string
	Input    []string
	Output   []string
	Template string
}

func (a *AutoCreateUT) GetFuncList() *AutoCreateUT {
	flow := InitFlow(a)
	for {
		if flow.Next() {
			break
		}
	}
	a.FuncList = flow.FuncList
	return a
}
