# frozen_string_literal: true

class ActivitySerializer
  include FastJsonapi::ObjectSerializer
  attributes :term
end
