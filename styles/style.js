"use strict";
var React = require("react-native");
var { StyleSheet, Dimensions } = React;

const { width: WIDTH } = Dimensions.get("window");

module.exports = StyleSheet.create({
  authContainer: {
    flex: 1,
    width: null,
    height: null,
    //backgroundColor: "#8F4370",
    justifyContent: "center",
    alignItems: "center"
  },
  creditIn: {
    display: "none"
  },
  bodyBlack: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#000000"
  },
  bodyWhite: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#ffffff"
  },
  container: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 0
  },
  heading1: {
    fontFamily: "Arial",
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
    margin: 40
  },
  heading2: {
    fontFamily: "Arial",
    fontSize: 20,
    textAlign: "center",
    color: "#000000",
    margin: 10
  },
  horizontalBorder: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 10
  },
  logo: { width: 120, height: 120 },
  logoContainer: { alignItems: "center", marginBottom: 50 },
  servus: {
    fontSize: 40,
    fontWeight: "500",
    marginTop: 10,
    color: "#FF8882",
    textAlign: "center"
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  inputIcon: { position: "absolute", top: 8, left: 37 },
  inputContainer: { marginTop: 10 },
  btn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#E88D72",
    justifyContent: "center",
    marginTop: 20
  },
  btnForm: {
    width: WIDTH - 155,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#E88D72",
    justifyContent: "center",
    marginTop: 20
  },
  btnText: {
    color: "#543855",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "bold"
  },
  btnEye: { position: "absolute", top: 8, right: 37 },
  btnSignOut: {
    width: 200,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#E88D72",
    justifyContent: "center",
    marginTop: 20
  },
  //SellAService styles
  formView: {
    flex: 1,
    backgroundColor: "#fff"
  },
  formStepIndicatorView: { padding: 20, paddingBottom: 10 },
  formInputContainerView: {
    backgroundColor: "#C0C2CC",
    flex: 8,
    marginHorizontal: 40,
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  formTextInput: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF8882",
    width: WIDTH - 125,
    height: 45,
    fontSize: 16,
    paddingLeft: 30,
    backgroundColor: "rgba(0,0,0,0.30)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  formDropdownView: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF8882",
    width: WIDTH - 125,
    height: 75,
    backgroundColor: "rgba(0,0,0,0.30)",
    paddingLeft: 8
  },
  formSliderView: {
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.30)",
    height: 90,
    width: WIDTH - 125,
    justifyContent: "center",
    alignItems: "center"
  },
  formTextInputPrice: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF8882",
    width: WIDTH - 290,
    height: 45,
    fontSize: 16,
    paddingLeft: 30,
    backgroundColor: "rgba(0,0,0,0.30)",
    color: "rgba(255,255,255,0.5)",
    marginHorizontal: 25
  },
  formDescription: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  formDescriptionInput: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF8882",
    width: WIDTH - 125,
    height: 200,
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.30)",
    color: "rgba(255,255,255,0.7)"
  },
  formChevronInputIcon: { position: "absolute", top: 8, left: 23 },
  formChevronInputDescriptionIcon: { position: "absolute", top: 9, left: 0 },
  formDollarInputIcon: { position: "absolute", top: 12, left: 38 },
  formUploadImageButton: {
    width: WIDTH - 125,
    height: 45,
    borderBottomWidth: 3,
    borderBottomColor: "#FF8882",
    backgroundColor: "rgba(0,0,0,0.30)"
  },
  submitFormButton: {
    width: 200,
    height: 45,
    alignItems: "center"
  },
  //ViewAccount styles



  //ViewOrder styles
  viewOrder: {
    height: 100,

  }
});
