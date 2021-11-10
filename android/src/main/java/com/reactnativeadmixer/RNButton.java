package com.reactnativeadmixer;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;

import androidx.appcompat.widget.AppCompatButton;

public class RNButton extends AppCompatButton {

  public RNButton(Context context) {
    super(context);
    requestLayout();
  }

  public void setButtonStyle(String textColor,
                             String backgroundColor,
                             String borderColor,
                             int borderWidth,
                             int borderRadius) {
    GradientDrawable gradientDrawable = new GradientDrawable();

    if(textColor != null) {
      int tc = Color.parseColor(textColor);
      this.setTextColor(tc);
    }

    if(backgroundColor != null) {
      int bc = Color.parseColor(backgroundColor);
      gradientDrawable.setColor(bc);
    }

    if(borderRadius > 0) {
      gradientDrawable.setCornerRadius(borderRadius*3);
    }

    if(borderWidth > 0) {
      int bc = Color.parseColor("#000000");
      if(borderColor != null) {
        bc = Color.parseColor(borderColor);
      }

      gradientDrawable.setStroke(borderWidth, bc);
    }

    this.setBackground(gradientDrawable);
  }

}
