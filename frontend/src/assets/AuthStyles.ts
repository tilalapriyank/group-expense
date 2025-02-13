import React from "react";

export const cardStyle : React.CSSProperties = {
    width: "100%",
    maxWidth: "500px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    textAlign: "center" as "center",
};

export const containerStyle : React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3BDBBC, #0288D1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export const cardContainerStyle : React.CSSProperties = {
    padding: "20px",
};

export const leftSideStyle : React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
};

export const rightSideStyle : React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    padding: "20px",
    color: "#fff",
};

export const headingStyle : React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0288D1",
};

export const subTextStyle : React.CSSProperties = {
    fontSize: "16px",
    marginTop: "10px",
    opacity: "0.8",
};

export const imageStyle : React.CSSProperties = {
    width: "80%",
    maxWidth: "400px",
    marginBottom: "20px",
};

// buttonStyle.ts
export const buttonStyle : React.CSSProperties = {
    backgroundColor: "#0288D1",
    borderColor: "#0288D1",
    borderRadius: "6px",
    fontSize: "16px",
};

export const toggleTextStyle : React.CSSProperties = {
    marginTop: "10px",
    color: "#0288D1",
    fontWeight: "bold",
    cursor: "pointer",
};
