# frozen_string_literal: true

class Activity
  attr_accessor :id, :term

  def initialize(term)
    @id = SecureRandom.uuid
    @term = term
  end
end
