import { FC, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { format, parseISO } from "date-fns";

import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Transaction } from "@/models/Transaction";
import { withTwoDecimals } from "@/utils";
import GoldMoneyIcon from "@/components/icons/GoldMoney";
import EditIcon from "@/components/icons/Edit";
import DeleteIcon from "@/components/icons/Delete";

type Props = {
  data: Transaction;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onCardPress: () => void;
  showMenu?: boolean;
};

type DetailItemProps = {
  label: string;
  value: string | number;
  showGbIcon?: boolean;
};

const DetailItem: FC<DetailItemProps> = ({
  label,
  value,
  showGbIcon = false,
}) => {
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <ThemedText
        style={{
          color: PrimaryYellow,
          fontWeight: "300",
          fontSize: 14,
          lineHeight: 17.07,
        }}
      >
        {label}
      </ThemedText>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {showGbIcon && <GoldMoneyIcon color={SecondaryYellow} />}
        <ThemedText
          style={{
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 19.5,
            color: SecondaryYellow,
          }}
        >
          {value}
        </ThemedText>
      </View>
    </View>
  );
};

const formatDate = (date: string) => {
  return format(parseISO(date), "MM/dd/yyyy");
};

const TransactionListItem: FC<Props> = ({
  data,
  showMenu = false,
  onPressDelete,
  onPressEdit,
  onCardPress,
}) => {
  const Gray = useThemeColor({}, "Gray");
  const PrimaryYellow = useThemeColor({}, "PrimaryYellow");
  const SecondaryYellow = useThemeColor({}, "SecondaryYellow");
  const MainBGColor = useThemeColor({}, "MainBGColor");
  const Snow = useThemeColor({}, "Snow");

  const handlePressCard = () => {
    onCardPress();
  };

  const handlePressEdit = () => {
    onPressEdit();
  };

  const handlePressDelete = () => {
    onPressDelete();
  };

  return (
    <Pressable
      style={{ ...styles.container, backgroundColor: Gray }}
      onPress={handlePressCard}
    >
      <View style={{ ...styles.header, borderBottomColor: "#EFD56970" }}>
        <ThemedText style={{ ...styles.date, color: PrimaryYellow }}>
          {formatDate(data.transactionDate)}
        </ThemedText>
        <ThemedText
          numberOfLines={1}
          style={{ ...styles.description, color: SecondaryYellow }}
        >
          {data.description}
        </ThemedText>
      </View>
      <View
        style={{
          ...styles.containerDetails,
          marginTop: 10,
        }}
      >
        <View style={styles.detailColumn}>
          <DetailItem
            label="Price"
            value={`$${withTwoDecimals(data.payload.price)}`}
          />
          <DetailItem
            label="Due"
            value={data.payload.due ? data.payload.due : 0}
            showGbIcon
          />
        </View>
        <View style={styles.detailColumn}>
          <DetailItem
            label="Rate"
            value={`$${withTwoDecimals(data.payload.rate)}`}
          />
          <DetailItem label="Paid" value={data.payload.payment} showGbIcon />
        </View>
        <View style={styles.detailColumn}>
          <DetailItem label="Currency" value={data.payload.sourceCurrency} />
          <DetailItem
            label="Change"
            value={`($${withTwoDecimals(data.payload.change)})`}
          />
        </View>
      </View>
      {showMenu && (
        <View style={{ ...styles.menu, backgroundColor: MainBGColor }}>
          <Pressable
            style={{ ...styles.containerMenuItem }}
            onPress={handlePressEdit}
          >
            <ThemedText style={{ ...styles.menuItemLabel, color: Snow }}>
              Edit
            </ThemedText>
            <EditIcon />
          </Pressable>
          <Pressable
            style={{ ...styles.containerMenuItem }}
            onPress={handlePressDelete}
          >
            <ThemedText style={{ ...styles.menuItemLabel, color: Snow }}>
              Delete
            </ThemedText>
            <DeleteIcon />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingBottom: 16,
    paddingHorizontal: 15,
    paddingTop: 8,
    position: "relative",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    height: 25,
  },
  date: {
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 17.07,
  },
  description: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19.5,
  },
  containerDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  detailColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  menu: {
    position: "absolute",
    left: 31,
    top: 16,
    paddingHorizontal: 16,
    paddingBottom: 15,
    paddingTop: 4,
    backgroundColor: "red",
    borderRadius: 10,
    width: 207,
  },
  containerMenuItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#EFD56970",
  },
  menuItemLabel: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default TransactionListItem;
