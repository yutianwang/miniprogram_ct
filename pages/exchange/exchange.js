var util = require('../../utils/util.js');
var regionUtil = require('../../utils/region.js');
var api = require('../../config/api.js');
Page({
  data: {
    address: {
      id: 0,
      province_id: 0,
      city_id: 0,
      district_id: 0,
      address: '',
      full_region: '',
      detailinfo: '',
      username: '',
      telnumber: '',
      is_default: 0
    },
    province_id: '',
    city_id: '',
    region_id: '',
    addressId: 0,
    flag: 0,
    multiIndex: [0, 0, 0],
    area_show: "请选择省份,城市,区域",
    member_name:'',
    member_mobile:'',
    memo:''
  },
  cancelAddress() {
      wx.switchTab({
        url: '/pages/index/index',
      })

  },
  onReady: function () {
    this.queryAreaInfo(null);
  },
  bindinputMemberName(event){
    this.setData({
      member_name: event.detail.value
    });
  },
  bindinputMemberMobile(event) {
    this.setData({
      member_mobile: event.detail.value
    });
  },
  bindinputMemo(event) {
    this.setData({
      memo: event.detail.value
    });
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.telnumber = event.detail.value;
    this.setData({
      address: address
    });
  },
 
  bindinputName(event) {
    let address = this.data.address;
    address.username = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.detailinfo = event.detail.value;
    this.setData({
      address: address
    });
  },
  saveAddress() {
    if(this.data.member_name == ''){
      util.showWarnModal('请输入你的姓名');
      return false;
    }
    if (this.data.member_mobile == '') {
      util.showWarnModal('请输入你的手机号');
      return false;
    }
    if (this.data.member_mobile.length != 11 || !this.data.member_mobile.match(/^1[3-9][0-9]\d{8}$/)) {
      util.showWarnModal('你的手机号输入有误');
      return false;
    }
    let address = this.data.address;
    if (address.username == '') {
      util.showWarnModal('收货人姓名为空');
      return false;
    }
    if (address.telnumber == '') {
      util.showWarnModal('收货人手机为空');
      return false;
    }
    if (address.telnumber.length != 11 || !address.telnumber.match(/^1[3-9][0-9]\d{8}$/)) {
      util.showWarnModal('收货人手机有误');
      return false;
    }
    if (this.data.province_id == '' || this.data.city_id == '0000') {
      util.showWarnModal('请选择省市区');
      return false;
    }

    if (address.detailinfo == '') {
      util.showWarnModal('请输入详细地址');
      return false;
    }
    wx.showLoading();
    let that = this;
    util.request(api.commit, {
      username: address.username,
      telnumber: address.telnumber,
      province_id: this.data.province_id,
      city_id: this.data.city_id,
      region_id: this.data.region_id,
      provinceName: address.province_name,
      cityName: address.city_name,
      countyName: address.district_name,
      detailinfo: address.detailinfo,
      sessionid: app.globalData.sessionid
    }, 'POST').then(function (res) {
      wx.hideLoading();
      if (res.errno === 0) {
        wx.showSuccessToast('兑换成功');
      }
    });
  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
  
  },
  bindchange(e) {
    var showText = "请选择省份,城市,区域";
    if (this.data.province[0][e.detail.value[0]].id != '00') {
      showText = this.data.province[0][e.detail.value[0]].name;
    }
    if (this.data.province[1][e.detail.value[1]].id != '0000') {
      showText += this.data.province[1][e.detail.value[1]].name;
    }
    if (this.data.province[2][e.detail.value[2]].id != '000000') {
      showText += this.data.province[2][e.detail.value[2]].name;
    }
    this.setData({
      multiIndex: e.detail.value,
      area_show: showText,
      province_id: this.data.province[0][e.detail.value[0]].id,
      city_id: this.data.province[1][e.detail.value[1]].id,
      region_id: this.data.province[2][e.detail.value[2]].id,
    })
  },
  bindPickerChange(e) {
    console.log(11);
    var data = {
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiIndex[2] = 0;
        break;
    }
    this.queryAreaInfo(data.multiIndex);
    this.setData(data);
  },
  queryAreaInfo: function (multiIndex) {
    var that = this;
    var pid = "";
    var cid = "";
    if (multiIndex) {
      pid = this.data.province[0][multiIndex[0]].id;
      cid = this.data.province[1][multiIndex[1]].id;
    }
    let province = regionUtil.getRegion(pid, cid);
    that.setData({
      province: province
    });
  }
})