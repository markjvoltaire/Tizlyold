import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";

export default function Comments() {
  return (
    <View>
      <Text>Comments</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
