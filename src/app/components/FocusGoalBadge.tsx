import React from 'react'
import { Badge } from "@/components/ui/badge"

interface FocusGoalBadgeProps {
  children: React.ReactNode;
  className?: string;
}

function FocuseGoalBadge({ children, className }: FocusGoalBadgeProps) {
  return (
    <Badge variant="outline" className={className}>{children}</Badge>
  )
}

export default FocuseGoalBadge