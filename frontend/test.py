def perm_generator(lst: list[int]):
    if len(lst) <= 1:
        yield lst
        return
    for item in lst:
        lst_copy = lst[:]
        lst_copy.remove(item)
        sub_perms: list[list[int]] = [[item] + sub_items for sub_items in perm_generator(lst_copy)]
        yield from sub_perms

if __name__ == '__main__':
    print(list(perm_generator([1, 2, 3])))

