package ut

func (a *AutoCreateUT) GetPackage() *AutoCreateUT {
	if a.OriFields[0] == "package" && len(a.OriFields) >= 2 {
		// 去掉package和包名
		a.Package = a.OriFields[1]
		a.OriFields = a.OriFields[2:]
	}
	return a
}
