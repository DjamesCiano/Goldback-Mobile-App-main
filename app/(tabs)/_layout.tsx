import React from "react";
import { Tabs } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

import CalculatorIcon from "@/components/icons/Calculator";
import TransactionIcon from "@/components/icons/Transaction";
import MapIcon from "@/components/icons/Map";
import NewsIcon from "@/components/icons/News";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const MainBGColor = useThemeColor({}, "MainBGColor");
  const Black = useThemeColor({}, "Black");
  const insets = useSafeAreaInsets(); // Get safe area insets

  return (
    <>
      <StatusBar backgroundColor={MainBGColor} style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Black,
          tabBarInactiveTintColor: "#15151533",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: PrimaryYellow,
            height: 72 + insets.bottom, // Adjust height to include safe area
            paddingBottom: insets.bottom, // Add padding to avoid overlap with the home indicator
            borderWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
            fontFamily: "Montserrat",
          },
          tabBarButton: ({ children, ...props }) => {
            return (
              <Pressable
                {...props}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {children}
              </Pressable>
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Calculator",
            tabBarIcon: ({ color }) => <CalculatorIcon color={color} />,
            tabBarLabel: ({ color, children }) => (
              <ThemedText
                style={{
                  color,
                  fontSize: 10,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {children}
              </ThemedText>
            ),
          }}
        />
        <Tabs.Screen
          name="(transactions)"
          options={{
            title: "Transaction",
            tabBarIcon: ({ color }) => <TransactionIcon color={color} />,
            tabBarLabel: ({ color, children }) => (
              <ThemedText
                style={{
                  color,
                  fontSize: 10,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {children}
              </ThemedText>
            ),
          }}
        />
        <Tabs.Screen
          name="(map)"
          options={{
            title: "Map",
            tabBarIcon: ({ color }) => <MapIcon color={color} />,
            tabBarLabel: ({ children, color }) => (
              <ThemedText
                style={{
                  color,
                  fontSize: 10,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {children}
              </ThemedText>
            ),
          }}
        />
        <Tabs.Screen
          name="(news)"
          options={{
            title: "News",
            tabBarIcon: ({ color }) => <NewsIcon color={color} />,
            tabBarLabel: ({ children, color }) => (
              <ThemedText
                style={{
                  color,
                  fontSize: 10,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {children}
              </ThemedText>
            ),
            tabBarButtonTestID: "tab-button",
          }}
        />
      </Tabs>
    </>
  );
}
