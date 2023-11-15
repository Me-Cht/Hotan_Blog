import axios from "axios";

export default {
    data() {
        return {
            dialogVisible: false,
            newCategory: {
                name: "", // 新分类的名称
            },
            categories: [], // 分类列表
        };
    },
    methods: {
        showAddCategoryDialog() {
            // 显示添加分类对话框
            this.dialogVisible = true;
        },
        addCategory() {
            // 确定添加分类
            if (this.newCategory.name) {
                // 将新分类名称添加到分类列表中
                if (this.categories.includes(this.newCategory.name)) {
                    alert("不允许同名分类")
                } else {
                    this.categories.push(this.newCategory.name);
                    localStorage.setItem('categories', JSON.stringify(this.categories));
                }
                // 将分类列表保存到 localStorage 中
                // 清空输入框
                this.newCategory.name = "";
                // 隐藏对话框
                this.dialogVisible = false;
            }
        },
        fetchCategories() {
            axios.get('http://localhost:8088/api/article/category')
                .then(response => {
                    if (response.data.code === "0") {
                        this.categories = response.data.data;
                        // 将分类列表保存到 localStorage 中
                        localStorage.setItem('categories', JSON.stringify(this.categories));
                        console.log("this.categories", this.categories);
                        console.log("接口返回数据：", response.data);
                    } else {
                        alert("获取分类数据失败：", response.data.msg);
                    }
                })
                .catch(error => {
                    alert("获取数据失败", error);
                });
        },
        get_category(category) {
            console.log("category:", category)
        }
    },
    created() {
        // 从 localStorage 中恢复分类列表
        const categoriesStorage = localStorage.getItem('categories');
        if (categoriesStorage) {
            this.categories = JSON.parse(categoriesStorage);
        } else {
            // 如果 localStorage 中没有分类列表，则从接口获取
            this.fetchCategories();
        }
    }
};

