<template>
    <el-color-picker v-model="theme" class="theme-picker" :predefine="predefineColors"
        popper-class="theme-picker-dropdown">
    </el-color-picker>
</template>

<script>
    import antdColorPalette from '../tools/color/antd'
    const elementVersion = require("element-ui/package.json").version; // element-ui版本号
    const antdVersion = '3.26.14'; // antd版本号
    const ELEMENT_ORIGINAL_THEME = "#409EFF";
    const ANTD_ORIGINAL_THEME = "#1890ff";
    export default {
        name: "colorPicker",
        data() {
            return {
                elementChalk: "",
                antdChalk: "",
                theme: '',
                predefineColors: [
                    "#409EFF",
                    "#ff4500",
                    "#ff8c00",
                    "#ffd700",
                    "#90ee90",
                    "#00ced1",
                    "#1e90ff",
                    "#c71585"
                ]
            };
        },
        mounted() {
            if (!localStorage.getItem('colorPicker')) {
                localStorage.setItem('colorPicker', ELEMENT_ORIGINAL_THEME)
            }
            if (this.CheckIsColor(localStorage.getItem('colorPicker'))) {
                this.theme = localStorage.getItem('colorPicker')
            }
            this.initElementUIColor(localStorage.getItem('colorPicker'), ELEMENT_ORIGINAL_THEME)
            this.initAntdColor(localStorage.getItem('colorPicker'), ANTD_ORIGINAL_THEME)
        },
        watch: {
            theme(val, oldVal) {
                if (typeof val !== "string") return;
                if (!oldVal) oldVal = "#409EFF"
                localStorage.setItem('colorPicker', val)
                this.updateColor(val, oldVal)
            }
        },

        methods: {
            CheckIsColor(bgVal) {
                var type = "^#[0-9a-fA-F]{6}$";
                var re = new RegExp(type);
                if (bgVal.match(re) == null) {
                    type = "^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$";
                    re = new RegExp(type);
                    if (bgVal.match(re) == null) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            /**
             * 色值替换
             */
            updateStyle(style, oldCluster, newCluster) {
                let newStyle = style;
                oldCluster.forEach((color, index) => {
                    newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
                });
                return newStyle;
            },
            /**
             * 远程获取样式表文件
             */
            getCSSString(url, callback, variable) {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(/fonts\/element-icons/g, `https://assets.winerlu.com/openModules/element-ui@${elementVersion}/lib/theme-chalk/fonts/element-icons`);
                        callback();
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            },

            /**
             * element ui色板算法，较简单，没封装
             */
            getElementThemeCluster(theme) {
                const tintColor = (color, tint) => {
                    let red = parseInt(color.slice(0, 2), 16);
                    let green = parseInt(color.slice(2, 4), 16);
                    let blue = parseInt(color.slice(4, 6), 16);

                    if (tint === 0) {
                        // when primary color is in its rgb space
                        return [red, green, blue].join(",");
                    } else {
                        red += Math.round(tint * (255 - red));
                        green += Math.round(tint * (255 - green));
                        blue += Math.round(tint * (255 - blue));

                        red = red.toString(16);
                        green = green.toString(16);
                        blue = blue.toString(16);

                        return `#${red}${green}${blue}`;
                    }
                };

                const shadeColor = (color, shade) => {
                    let red = parseInt(color.slice(0, 2), 16);
                    let green = parseInt(color.slice(2, 4), 16);
                    let blue = parseInt(color.slice(4, 6), 16);

                    red = Math.round((1 - shade) * red);
                    green = Math.round((1 - shade) * green);
                    blue = Math.round((1 - shade) * blue);

                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);

                    return `#${red}${green}${blue}`;
                };

                const clusters = [theme];
                for (let i = 0; i <= 9; i++) {
                    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
                }
                clusters.push(shadeColor(theme, 0.1));
                return clusters;
            },
            /**
             * 初始化element ui的样式表
             */
            initElementUIColor (val, oldVal) {
                const themeCluster = this.getElementThemeCluster(val.replace("#", ""));
                const originalCluster = this.getElementThemeCluster(oldVal.replace("#", ""));
                const getHandler = (variable, id) => {
                    return () => {
                        const originalCluster = this.getElementThemeCluster(
                            ELEMENT_ORIGINAL_THEME.replace("#", "")
                        );
                        const newStyle = this.updateStyle(
                            this[variable],
                            originalCluster,
                            themeCluster
                        );
                        this.deleteStyleByID('init_elementui')
                        let styleTag = document.getElementById(id);
                        if (!styleTag) {
                            styleTag = document.createElement("style");
                            styleTag.setAttribute("id", id);
                            document.head.prepend(styleTag);
                        }
                        styleTag.innerText = newStyle;
                    };
                };

                const chalkHandler = getHandler("elementChalk", "elementUI-style");

                if (!this.elementChalk) {
                    const url = `https://assets.winerlu.com/openModules/element-ui@${elementVersion}/lib/theme-chalk/index.css`;
                    this.getCSSString(url, chalkHandler, "elementChalk");
                } else {
                    chalkHandler();
                }
            },
            /**
             * antd的色板算法，封装在 /tools/color/antd
             */
            getAntdThemeCluster(theme) {
                const clusters = [theme];
                for (let i = 0; i <= 9; i++) {
                    clusters.push(antdColorPalette(theme, i + 1));
                }
                return clusters;
            },
            /**
             * 初始化antd的样式表
             */
            initAntdColor (val, oldVal) {
                const themeCluster = this.getAntdThemeCluster(val.replace("#", ""));
                const originalCluster = this.getAntdThemeCluster(oldVal.replace("#", ""));
                const getHandler = (variable, id) => {
                    return () => {
                        const originalCluster = this.getAntdThemeCluster(
                            ANTD_ORIGINAL_THEME.replace("#", "")
                        );
                        const newStyle = this.updateStyle(
                            this[variable],
                            originalCluster,
                            themeCluster
                        );
                        this.deleteStyleByID('init_antd')
                        let styleTag = document.getElementById(id);
                        if (!styleTag) {
                            styleTag = document.createElement("style");
                            styleTag.setAttribute("id", id);
                            document.head.prepend(styleTag);
                        }
                        styleTag.innerText = newStyle;
                    };
                };

                const chalkHandler = getHandler("antdChalk", "antd-style");
                if (!this.antdChalk) {
                    const url = `https://assets.winerlu.com/openModules/antd@${antdVersion}/dist/antd.min.css`;
                    this.getCSSString(url, chalkHandler, "antdChalk");
                } else {
                    chalkHandler();
                }
            },

            /**
             * 主题色改变事件
             */
            updateColor (val, oldVal) {
                /**
                 * 默认采用elementUI的配色方案
                 */
                const themeCluster = this.getAntdThemeCluster(val.replace("#", ""));
                const originalCluster = this.getAntdThemeCluster(oldVal.replace("#", ""));
                const styles = [].slice
                    .call(document.querySelectorAll("style"))
                    .filter(style => {
                    const text = style.innerText;
                    return (
                        new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
                    );
                });
                styles.forEach(style => {
                    const { innerText } = style;
                    if (typeof innerText !== "string") return;
                    /**
                     * antd的样式因为和element-ui的不一样，需要单独设置配色方案
                     */
                    if (style.id === 'antd-style') {
                        const antd_themeCluster = this.getAntdThemeCluster(val.replace("#", ""));
                        const antd_originalCluster = this.getAntdThemeCluster(oldVal.replace("#", ""));
                        style.innerText = this.updateStyle(
                            innerText,
                            antd_originalCluster,
                            antd_themeCluster
                        );
                    } else if (style.id === 'elementUI-style') {
                        const element_themeCluster = this.getElementThemeCluster(val.replace("#", ""));
                        const element_originalCluster = this.getElementThemeCluster(oldVal.replace("#", ""));
                        style.innerText = this.updateStyle(
                            innerText,
                            element_originalCluster,
                            element_themeCluster
                        );
                    } else {
                        style.innerText = this.updateStyle(
                            innerText,
                            originalCluster,
                            themeCluster
                        );
                    }
                });
            },
            /**
             * 删除预先定义的远程样式表
             */
            deleteStyleByID (id) {
                const links = [].slice
                    .call(document.querySelectorAll("link"))
                    .filter(link => {
                    return link.id === id
                });
                links.forEach(link => link.href = '')
            }
        }
    };
</script>

<style>
    .theme-picker .el-color-picker__trigger {
        vertical-align: middle;
    }

    .theme-picker-dropdown .el-color-dropdown__link-btn {
        display: none;
    }
</style>