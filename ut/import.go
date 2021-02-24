package ut

func (a *AutoCreateUT) GetImport() *AutoCreateUT {
	if a.OriFields[0] == "import" && a.OriFields[1] == "(" {
		// 多行引用
		a.MultiImport()
	} else {
		// 单个引用
		a.SingleImport()
	}
	return a
}

func (a *AutoCreateUT) MultiImport() *AutoCreateUT {
	a.OriFields = a.OriFields[2:]
	for {
		if a.OriFields[0] != ")" {
			a.Import = append(a.Import, a.OriFields[0])
			a.OriFields = a.OriFields[1:]
		} else {
			a.OriFields = a.OriFields[1:]
			break
		}
	}
	return a
}

func (a *AutoCreateUT) SingleImport() *AutoCreateUT {
	for {
		if len(a.OriFields) >= 2 && a.OriFields[0] == "import" && a.OriFields[1] != "" {
			a.Import = append(a.Import, a.OriFields[1])
			a.OriFields = a.OriFields[2:]
		} else {
			break
		}
	}
	return a
}
