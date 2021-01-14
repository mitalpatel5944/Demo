import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import apis from './lib/apis'
import log from './lib/log'

import { colors, fonts, images } from "./theme";

import { Category } from './screens'
import { FlatList, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
export default class Router extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            Splash: true,
            activeIndex: 0,
            CatId: 0,
            page: 1,
            isLoadMore: false,
            subCategoryData: []
        }
        this.getCategory()
    }
    getCategory = () => {
        this.setState({ isLoading: true })
        let params = {
            "CategoryId": 0,
            "DeviceManufacturer": "Google",
            "DeviceModel": "Android SDK built for x86",
            "DeviceToken": " ",
            "PageIndex": 1
        }
        apis.getCategory(params)
            .then((res) => {
                this.setState({ isLoading: false })
                log.success("Succesfully get category", res)
                if (res.status == 200) {
                    this.setState({ data: res.data.Result.Category })
                    if (res.data.Result.Category.length > 0) {
                        this.setState({ CatId: res.data.Result.Category[0].Id }, () => {
                            this.callSubCategory()
                        })
                    }
                }
            })
            .catch((err) => {
                this.setState({ isLoading: false, data: [] })
                log.error("failed get category", err)
            })
    }

    callSubCategory = () => {
        this.setState({ isLoading: true })
        let params = {
            "CategoryId": this.state.CatId,
            "PageIndex": this.state.page
        }
        apis.getCategory(params)
            .then((res) => {
                this.setState({ isLoading: false })
                log.success("Succesfully callSubCategory category", res)
                if (res.status == 200) {
                    if (this.state.page == 1) {
                        this.setState({ subCategoryData: res.data.Result.Category[0].SubCategories })
                    }
                    else {
                        if (res.data.Result.Category[0].SubCategories != undefined) {
                            this.setState({ isLoadMore: false, subCategoryData: this.state.subCategoryData.concat(res.data.Result.Category[0].SubCategories) })
                        }
                    }
                }
            })
            .catch((err) => {
                this.setState({ isLoading: false, subCategoryData: [] })
                log.error("failed get category", err)
            })
    }

    ChangeTab = (index, id) => {
        this.setState({ activeIndex: index, CatId: id, page: 1, subCategoryData: [] }, () => {
            this.callSubCategory()
        })
    }

    renderFooter = () => {
        if (this.state.isLoading)
            return (
                <View>
                    {this.renderActivityLoader()}
                </View>
            )
        else {
            return <View />
        }
    }

    renderHeader = () => {
        return (
            <View style={styles.scrollStyleMain}>
                <View style={styles.headerIcon}>
                    <TouchableOpacity onPress={() => { alert("Filter") }}>
                        <Image source={images.filter} style={[styles.icon]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { alert("search") }}>
                        <Image source={images.search} style={[styles.icon]} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderCategoryTab = () => {
        return (
            <View style={{ height: '10%' }}>
                <ScrollView style={{ height: '20%' }} horizontal showsHorizontalScrollIndicator={false} >
                    {this.state.data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback style={styles.scrollStyle} onPress={() => {
                                this.ChangeTab(index, item.Id)
                            }}>
                                <Text style={[styles.tabBarTextStyle, {
                                    fontSize: index == this.state.activeIndex ? 18 : 13, color: index == this.state.activeIndex ? colors.white : colors.placeholder
                                }]}>
                                    {item.Name}
                                </Text>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollView>
            </View>

        )
    }



    handleLoadMore = () => {
        if (!this.state.isLoadMore) {
            let temp = this.state.page + 1;
            this.setState(
                {
                    page: temp,
                    isLoadMore: true,
                },
                () => {
                    this.callSubCategory();
                }
            );
        }
    };


    renderSubCategory = () => {
        return (
            <FlatList
                data={this.state.subCategoryData}
                style={{ margin: 10 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text>No Records found</Text>}
                renderItem={({ item, index }) => {
                    console.log("item", item);
                    return (
                        <View>
                            <Text style={styles.catHeader}>{item.Name}</Text>
                            {this.renderProductList(item)}
                        </View>
                    )
                }}
                ListFooterComponent={this.renderFooter.bind(this)}
                onEndReachedThreshold={0.01}
                onEndReached={this.handleLoadMore.bind(this)}
            />
        )
    }

    renderProductList = (item) => {
        return (
            <FlatList
                keyExtractor={(item) => item.id}
                horizontal
                data={item.Product}
                ItemSeparatorComponent={() => (
                    <View style={{ width: 10, backgroundColor: colors.white }} />
                )}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Image source={{ uri: item.ImageName }} style={{
                                resizeMode: 'cover',
                                backgroundColor: colors.sea_blue, width: 100, height: 100, borderRadius: 10
                            }} />
                            <Text style={styles.subitem}>{item.Name}</Text>
                        </View>
                    )
                }}
            />
        )
    }

    renderActivityLoader = () => (
        <ActivityIndicator size={50} color={colors.black} />
    )
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderHeader()}
                {this.renderCategoryTab()}
                {this.renderSubCategory()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        justifyContent: 'center',
        backgroundColor: colors.black,
        // height: '10%',
        flex: 1,
        paddingHorizontal: 10
    },
    scrollStyleMain: {
        backgroundColor: colors.black,
        height: '5%'
    },
    headerIcon: { flexDirection: 'row', alignSelf: 'flex-end', padding: 5 },
    subitem: {
        paddingHorizontal: 5,
        fontSize: 10,
        marginTop: 10,
        // alignSelf: 'center',
        fontFamily: fonts.pbo
    },
    catHeader: {
        paddingHorizontal: 5,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: fonts.pbo
    },
    icon: { tintColor: colors.white, height: 25, width: 25, marginHorizontal: 10 },
    tabBarTextStyle: {
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: fonts.pbo
    },
    underlineStyle: {
        height: 3,
        backgroundColor: colors.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
})